import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBookService } from 'src/user-book/user-book.service';
import { Repository } from 'typeorm';
import { CreateDeliveryDto, UpdateDeliveryDto } from './delivery.dto';
import { Delivery, DeliveryState } from './delivery.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    private readonly bookService: UserBookService,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    return await this.deliveryRepository.save(createDeliveryDto);
  }

  async findAll() {
    return await this.deliveryRepository.findAndCount();
  }

  async findOne(id: string) {
    return await this.deliveryRepository.findOne(id);
  }

  async update(id: string, state: DeliveryState) {
    const receipt = await this.findOne(id);
    if (state === DeliveryState.Done) {
    }
    return await this.deliveryRepository.update(id, { ...receipt, state });
  }

  async updateState(payload: UpdateDeliveryDto) {
    const receipt = await this.findOne(payload.id);
    const book = await this.bookService.findById(payload.id);
    await this.bookService.updateDeliveryState(book.id, payload.state);
    return await this.deliveryRepository.update(payload.id, {
      ...receipt,
      state: payload.state,
    });
  }

  async remove(id: string) {
    return await this.deliveryRepository.delete(id);
  }
}
