import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBookService } from 'src/user-book/user-book.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import {
  CreateDeliveryDto,
  UpdateDeliveryDto,
  UpdateStateDto,
} from './delivery.dto';
import { Delivery, DeliveryState } from './delivery.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    private readonly bookService: UserBookService,
    private readonly userService: UserService,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    const buyer = await this.userService.findOne(createDeliveryDto.buyerId);
    const delivery = {
      address: buyer.address,
      phone: buyer.phone,
      state: DeliveryState.Waiting,
      bookId: createDeliveryDto.bookId,
    };
    return await this.deliveryRepository.save(delivery);
  }

  async findAll() {
    return await this.deliveryRepository.find();
  }

  async findOne(id: string) {
    return await this.deliveryRepository.findOne(id);
  }

  async update(id: string, payload: UpdateDeliveryDto) {
    // const receipt = await this.findOne(id);
    const updatedAt = new Date();
    return await this.deliveryRepository.update(id, { ...payload, updatedAt });
  }

  async updateState(payload: UpdateStateDto) {
    const delivery = await this.findOne(payload.id);
    const book = await this.bookService.findById(delivery.bookId);
    await this.bookService.updateDeliveryState(book.id, payload.state);
    await this.update(payload.id, {
      ...delivery,
      state: payload.state,
    });

    return await this.findOne(payload.id);
  }

  async remove(id: string) {
    return await this.deliveryRepository.delete(id);
  }
}
