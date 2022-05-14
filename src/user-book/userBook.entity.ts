import { BaseEntity } from 'src/core/entities/base.entity';
import { DeliveryState } from 'src/delivery/delivery.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BookStatus } from './interface';

@Entity()
export class UserBook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  ownerId: string;

  @Column('text')
  owner: string;

  @Column({ nullable: true })
  buyerId: string;

  @Column('text')
  title: string;

  @Column('text')
  author: string;

  @Column('text')
  description: string;

  @Column('text')
  imageUrl: string;

  @Column({ type: 'decimal', nullable: true })
  price: number;
  @Column()
  startTime: Date;
  @Column({ nullable: true })
  buyTime: Date;

  @Column({
    type: 'enum',
    enum: BookStatus,
    default: BookStatus.SELLING,
  })
  status: BookStatus;

  @Column({
    type: 'enum',
    enum: DeliveryState,
    default: DeliveryState.None,
  })
  deliveryState: DeliveryState;
}
