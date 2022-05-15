import { ApiProperty } from '@nestjs/swagger';
import { DeliveryState } from './delivery.entity';
export class CreateDeliveryDto {
  @ApiProperty()
  bookId: string;

  @ApiProperty()
  buyerId: string;
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
  state: DeliveryState;
}
