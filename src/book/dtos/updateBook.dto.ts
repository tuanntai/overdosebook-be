import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../entities/book.entity';
export class UpdateBookDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly discountPercent: number;
}

export class UpdateOwnerBookDto {
  @ApiProperty()
  readonly book: Book;
}
