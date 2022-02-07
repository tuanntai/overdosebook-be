import { ApiProperty } from '@nestjs/swagger';
export class CreateUserBookDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  bookId: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  excerpt: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  buyTime: Date;
}
