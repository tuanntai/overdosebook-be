import { ApiProperty } from '@nestjs/swagger';
export class LoginReturnDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiresIn: string;

  @ApiProperty()
  userId: number;
}
