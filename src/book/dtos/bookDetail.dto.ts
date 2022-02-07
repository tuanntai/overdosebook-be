import { ApiProperty } from '@nestjs/swagger';

export class BookDetailDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly author: string;

  @ApiProperty()
  readonly publisher: string;

  @ApiProperty()
  readonly excerpt: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly amount: number;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly discountPercent: number;
}
