import { ApiProperty } from '@nestjs/swagger';
export class AddFundDto {
  @ApiProperty()
  readonly balance: number;
  @ApiProperty()
  readonly userId: number;
}
