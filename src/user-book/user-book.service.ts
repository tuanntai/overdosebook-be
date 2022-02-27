import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ALL } from 'dns';
import { response } from 'express';
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
    private readonly userServiceRepository: UserService,
  ) {}

  async create(createUserBookDto: CreateUserBookDto) {
    const startTime = new Date();
    const status = BookStatus.SELLING;
    const owner = await this.userServiceRepository.findOne(
      createUserBookDto.ownerId,
    );
    return await this.userBookRepository.save({
      ...createUserBookDto,
      startTime,
      status,
      owner: owner.fullName,
    });
  }

  async update(id: number, UpdateUserBookDto: UpdateUserBookDto) {
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
    const buyTime = new Date();
    const owner = await this.userServiceRepository.findOne(bookData.ownerId);
    await this.userServiceRepository.update({
      ...owner,
      id: owner.id,
      soldBookAmount: owner.soldBookAmount + 1,
    });

    if (owner.soldBookAmount + 1 >= 10) {
      const response = await this.userServiceRepository.setVerify(owner.id);
      console.log(response);
    }
    await this.userBookRepository.update(payload.id, {
      ...bookData,
      buyTime: buyTime,
      status: BookStatus.SOLD,
      buyerId: payload.buyerId,
      id: payload.id,
    });
    return bookData;
  }

  async findById(id: number) {
    return await this.userBookRepository.findOne(id);
  }
  async findByOption(opt: {}) {
    return await this.userBookRepository.find(opt);
  }

  async getAllPaging(options: PaginationParams, searchFields: string[]) {
    const search = (options.search || '').trim();
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

  async findAll() {
    return await this.userBookRepository.find();
  }

  async findBookByUserId(userId: number) {
    const listUserBook = await this.findAll();
    const ownerBook = listUserBook.filter((item) => item.ownerId == userId);
    return ownerBook;
  }

  async recentlyBuyBook() {
    return null;
  }
}
