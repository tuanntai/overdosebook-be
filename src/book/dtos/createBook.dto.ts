import { ApiProperty } from '@nestjs/swagger';
export class CreateBookDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty({ required: false })
  readonly author: string;

  @ApiProperty({ required: false })
  readonly publisher: string;

  @ApiProperty({ required: false })
  readonly excerpt: string;

  @ApiProperty({ required: false })
  readonly description: string;

  @ApiProperty({ required: false })
  readonly imageUrl: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly amount: number;

  @ApiProperty()
  readonly discountPercent: number;
}
