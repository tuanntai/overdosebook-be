import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class Receipt extends BaseEntity {
  @Column({ type: 'bigint' })
  sellerId: string;

  @Column({ type: 'bigint' })
  buyerId: string;

  @Column({ type: 'bigint' })
  bookId: string;

  @Column({ type: 'decimal' })
  price: number;
}
