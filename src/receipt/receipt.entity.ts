import { BaseEntity } from 'src/core/entities/base.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
@Entity()
export class Receipt extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @Column({ type: 'bigint' })
  bookId: string;

  @Column({ type: 'decimal' })
  price: number;
}
