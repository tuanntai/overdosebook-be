import { ApiProperty } from '@nestjs/swagger';
import { RoleState } from './user.entity';
export class AddFundDto {
  @ApiProperty()
  readonly balance: number;
  @ApiProperty()
  readonly userId: string;
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
  readonly role: RoleState;

  @ApiProperty()
  readonly avatarUrl: string;
}

export class UpdateUserDto {
  @ApiProperty()
  readonly avatarUrl: string;

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly balance: number;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly fullName: string;

  @ApiProperty()
  readonly isVerify: boolean;

  @ApiProperty()
  readonly soldBookAmount: number;
}
