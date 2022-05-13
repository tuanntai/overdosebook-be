import { ApiProperty, PartialType } from '@nestjs/swagger';
import { DeliveryState } from './delivery.entity';
export class CreateDeliveryDto {
  @ApiProperty()
  receiptId: string;
}

export class UpdateDeliveryDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  state: DeliveryState;
}

export class UpdateStateDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  bookId: string;
  @ApiProperty()
  state: DeliveryState;
}
