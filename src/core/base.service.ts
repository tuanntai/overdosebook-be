import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  ILike,
  Repository,
} from 'typeorm';
import { BaseEntity } from './entities/base.entity';
import { PaginationParams, PaginationResponse } from './interfaces';

@Injectable()
export class BaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  create(entity: DeepPartial<T>): Promise<T> {
    return this.genericRepository.save(entity);
  }

  getAll(): Promise<T[]> {
    return this.genericRepository.find();
  }

  async getAllPaging(
    options: PaginationParams,
    searchFields: string[],
    conditionalFields: Record<
      string,
      string | number | Record<string, string | number>
    >,
    relations: string[] = [],
  ): Promise<PaginationResponse<T>> {
    const size = options.size || 10;
    const page = options.page || 0;
    const search = (options.search || '').trim();
    const order = options.order || 'createdAt';
    const direction = options.direction || 'DESC';
    const filter = [];
    for (const field of searchFields) {
      filter.push({ [field]: ILike(`%${search}%`), ...conditionalFields });
    }

    const [items, total] = await this.genericRepository.findAndCount({
      where: filter,
      relations,
      order: {
        [order]: direction,
      },
      take: size,
      skip: page * size,
    } as FindManyOptions<T>);

    return {
      totalItems: total,
      totalPages: Math.ceil(total / size),
      currentPage: page,
      items,
      limit: size,
    };
  }

  get(id: string | number, options?: FindOneOptions<T>): Promise<T> {
    return this.genericRepository.findOne(id, options);
  }

  findByPublicId(publicId: string): Promise<T> {
    return this.genericRepository.findOne({ where: { publicId } });
  }

  findOne(options: FindManyOptions<T>): Promise<T> {
    return this.genericRepository.findOne(options);
  }

  find(options: FindManyOptions<T>): Promise<T[]> {
    return this.genericRepository.find(options);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.genericRepository.softDelete(id);
    return !!result.affected;
  }

  update(entity: DeepPartial<T>): Promise<T> {
    return this.genericRepository.save(entity);
  }
}
