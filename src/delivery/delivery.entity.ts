import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity } from 'typeorm';

export enum DeliveryState {
  None = 'None',
  Waiting = 'Waiting',
  Shipping = 'Shipping',
  Done = 'Done',
}
@Entity()
export class Delivery extends BaseEntity {
  @Column({ type: 'bigint' })
  receiptId: string;
  @Column({ type: 'enum', enum: DeliveryState, default: DeliveryState.Waiting })
  state: DeliveryState;
}
