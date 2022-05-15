import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryState } from 'src/delivery/delivery.entity';
import { ReceiptService } from 'src/receipt/receipt.service';
import { UserBook } from 'src/user-book/userBook.entity';
import { UserService } from 'src/user/user.service';
import { Like, Repository } from 'typeorm';
import {
  BookStatus,
  BuyBookDto,
  CreateUserBookDto,
  EOrder,
  PaginationParams,
  UpdateUserBookDto,
} from './interface';

@Injectable()
export class UserBookService {
  constructor(
    @InjectRepository(UserBook)
    private readonly userBookRepository: Repository<UserBook>,
    private readonly userService: UserService,
    private readonly receiptService: ReceiptService,
  ) {}

  async getBookAnalyze() {
    const listUserBook = await this.findAll();
    const listBookAmount = listUserBook.length;
    const sellingBookAmount = listUserBook.filter(
      (item) => !item.buyerId,
    ).length;
    return {
      sellingBook: sellingBookAmount,
      soldBook: listBookAmount - sellingBookAmount,
      allBook: listBookAmount,
    };
  }

  async findAll() {
    return await this.userBookRepository.find();
  }

  async create(createUserBookDto: CreateUserBookDto) {
    const startTime = new Date();
    const status = BookStatus.SELLING;
    const owner = await this.userService.findOne(createUserBookDto.ownerId);
    return await this.userBookRepository.save({
      ...createUserBookDto,
      startTime,
      status,
      owner: owner.fullName,
    });
  }

  async update(id: string, UpdateUserBookDto: UpdateUserBookDto) {
    try {
      return await this.userBookRepository.update(id, UpdateUserBookDto);
    } catch {
      (e: any) => {
        return e;
      };
    }
  }

  async buyBook(payload: BuyBookDto) {
    const bookData = await this.findById(payload.id);
    const buyer = await this.userService.findOne(payload.buyerId);
    const owner = await this.userService.findOne(bookData.ownerId);
    if (buyer.id === owner.id) {
      throw new BadRequestException('You can not buy your own.');
    }
    console.log(buyer.balance, bookData.price);

    if (Number(buyer.balance) < Number(bookData.price)) {
      throw new BadRequestException('Not enough money.');
    }
    const buyTime = new Date();

    await this.userService.update({
      ...owner,
      soldBookAmount: owner.soldBookAmount + 1,
      balance: Number(owner.balance) + Number(bookData.price),
    });

    await this.userService.update({
      ...buyer,
      balance: Number(buyer.balance) - Number(bookData.price),
    });

    if (owner.soldBookAmount + 1 >= 10) {
      await this.userService.setVerify(owner.id);
    }

    const soldBook: UserBook = {
      ...bookData,
      buyTime: buyTime,
      status: BookStatus.SOLD,
      buyerId: payload.buyerId,
      deliveryState: DeliveryState.Waiting,
    };
    await this.userBookRepository.update(payload.id, soldBook);

    const receipt = await this.receiptService.create({
      bookId: bookData.id,
      buyerId: payload.buyerId,
      price: bookData.price,
      sellerId: bookData.ownerId,
    });

    return { ...soldBook, receipt };
  }

  async findById(id: string) {
    return await this.userBookRepository.findOne(id);
  }
  async findByOption(opt: {}) {
    return await this.userBookRepository.find(opt);
  }

  async updateDeliveryState(id: string, deliveryState: DeliveryState) {
    const book = await this.userBookRepository.findOne(id);
    await this.update(book.id, { ...book, deliveryState });
  }

  async getAllPaging(options: PaginationParams, searchFields: string[]) {
    const search = (options.search || '').trim();
    const ownerId = (options.id || '').trim();
    const page = options.page || 0;
    const order = options.order || EOrder.DESC;
    const size = options.size || 10;
    const status = options.status === undefined ? '' : options.status;
    const filter = [];
    for (const field of searchFields) {
      filter.push({ [field]: Like(`%${search}%`) });
    }

    const [items, total] = status
      ? await this.userBookRepository.findAndCount({
          where: {
            status: status,
            author: Like(`%${search}%`),
            title: Like(`%${search}%`),
          },
          take: size,
          skip: page * size,
          order: {
            id: order,
          },
        })
      : await this.userBookRepository.findAndCount({
          where: {
            author: Like(`%${search}%`),
            title: Like(`%${search}%`),
          },
          take: size,
          skip: page * size,
          order: {
            id: order,
          },
        });

    return {
      totalItems: total,
      totalPages: Math.ceil(total / size),
      currentPage: page,
      data: items.sort((a, b) => (a.status < b.status ? 1 : -1)),
      limit: size,
    };
  }

  async getBooksByUserId(userId: string, query: any) {
    const listUserBook = await this.findAll();
    const ownerBook = listUserBook.filter((item) => item.ownerId === userId);
    return ownerBook;
  }

  async findBookByUserId(userId: string) {
    const listUserBook = await this.userBookRepository.find();
    const ownerBook = listUserBook.filter((item) => item.ownerId === userId);
    return ownerBook;
  }

  async recentlyBuyBook() {
    return null;
  }
}
