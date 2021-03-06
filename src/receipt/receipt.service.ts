import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EOrder, PaginationParams } from 'src/user-book/interface';
import { Like, Repository } from 'typeorm';
import { Receipt } from './receipt.entity';
import { CreateReceiptDto, UpdateReceiptDto } from './receipt.dto';
import { DeliveryService } from 'src/delivery/delivery.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepository: Repository<Receipt>,
    private readonly userService: UserService, // private readonly deliveryService: DeliveryService,
  ) {}

  async create(createReceiptDto: CreateReceiptDto) {
    const seller = await this.userService.findOne(createReceiptDto.sellerId);
    const buyer = await this.userService.findOne(createReceiptDto.buyerId);
    console.log({
      createReceiptDto,
    });

    const receipt = await this.receiptRepository.save({
      ...createReceiptDto,
      seller,
      buyer,
    });
    // await this.deliveryService.create({ receiptId: receipt.id });
    return receipt;
  }

  async findAll() {
    return await this.receiptRepository.find({
      relations: ['seller', 'buyer'],
    });
  }

  async findOne(id: string) {
    return await this.receiptRepository.findOne(id);
  }

  async findReceiptBySellerId(userId: string) {
    const receipts = await this.findAll();
    const sellerReceipts = receipts.filter((item) => item.seller.id === userId);
    return sellerReceipts;
  }

  async findReceiptByBuyerId(userId: string) {
    const receipts = await this.findAll();
    const buyerReceipts = receipts.filter((item) => item.buyer.id === userId);
    return buyerReceipts;
  }

  update(id: string, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  async remove(id: string) {
    return await this.receiptRepository.delete(id);
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
      ? await this.receiptRepository.findAndCount({
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
      : await this.receiptRepository.findAndCount({
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
      data: items,
      limit: size,
    };
  }
}
