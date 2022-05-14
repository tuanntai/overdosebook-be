import { ApiProperty } from '@nestjs/swagger';
import { DeliveryState } from './delivery.entity';
export class CreateDeliveryDto {
  @ApiProperty()
  bookId: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;
}

export class UpdateDeliveryDto {
  @ApiProperty()
  state: DeliveryState;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;
}

export class UpdateStateDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  bookId: string;
  @ApiProperty()
  state: DeliveryState;
}
