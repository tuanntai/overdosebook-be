import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
export class CreateReceiptDto {
  @ApiProperty()
  sellerId: string;
  @ApiProperty()
  buyerId: string;
  @ApiProperty()
  bookId: string;
  @ApiProperty()
  @IsNumber()
  price: number;
}
export class UpdateReceiptDto extends PartialType(CreateReceiptDto) {}
