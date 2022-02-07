import { ApiProperty } from '@nestjs/swagger';

export class BookAbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  excerpt: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  discountPercent: number;
}

export class BookAbstractListDto {
  totalPage: number;
  totalItem: number;
  data: BookAbstractDto[];
}
