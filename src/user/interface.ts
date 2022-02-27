import { ApiProperty } from '@nestjs/swagger';
export class AddFundDto {
  @ApiProperty()
  readonly balance: number;
  @ApiProperty()
  readonly userId: number;
}

export class CreateUserDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly fullName: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly avatarUrl: string;
}

export class UpdateUserDto {
  @ApiProperty()
  readonly avatarUrl: string;

  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly balance: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly fullName: string;

  @ApiProperty()
  readonly isVerify: boolean;

  @ApiProperty()
  readonly soldBookAmount: number;
}
