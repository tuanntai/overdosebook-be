import { ApiProperty } from '@nestjs/swagger';

export class AddBookDTO {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly amount: number;
}

export class BuyBookDTO {
  @ApiProperty()
  bookId: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  amount: number;
}
