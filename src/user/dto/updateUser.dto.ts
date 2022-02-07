import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly balance: number;
}
