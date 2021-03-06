import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { DeliveryState } from 'src/delivery/delivery.entity';

export enum BookStatus {
  SELLING = 'Selling',
  SOLD = 'SOLD',
  ALL = '',
}

export class BuyBookDto {
  @ApiProperty()
  buyerId: string;

  @ApiProperty()
  id: string;
}

export class CreateUserBookDto {
  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  price: number;
}

export class UpdateUserBookDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  buyerId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  buyTime: Date;

  @ApiProperty()
  status: BookStatus;

  @ApiProperty()
  deliveryState: DeliveryState;
}

export class PaginationParams {
  @IsOptional()
  @IsString()
  order?: EOrder;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  size?: number;

  @IsOptional()
  @IsString()
  id?: string;
}

export enum EOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
