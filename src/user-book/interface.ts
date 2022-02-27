import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum BookStatus {
  SELLING = 'Selling',
  SOLD = 'SOLD',
  ALL = 'ALL',
}

export class BuyBookDto {
  @ApiProperty()
  buyerId: number;

  @ApiProperty()
  id: number;
}

export class CreateUserBookDto {
  @ApiProperty()
  ownerId: number;

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
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  buyerId: number;

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
  status: string;
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
}

export enum EOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
