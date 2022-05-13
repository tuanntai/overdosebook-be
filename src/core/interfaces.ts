import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional()
  size?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  order?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  direction?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  search?: string;

  // @IsOptional()
  // @IsString()
  // @ApiPropertyOptional()
  // group?: string
}

export class PaginationResponse<T> {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  items: T[];
}
