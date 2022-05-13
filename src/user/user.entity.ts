import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../core/entities/base.entity';
@Entity()
export class User extends BaseEntity {
  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column('text')
  phone: string;

  @Column('text')
  fullName: string;

  @Column('text')
  address: string;

  @Column('text')
  email: string;

  @Column()
  soldBookAmount: number;

  @Column({ nullable: false })
  avatarUrl: string;

  @Column('boolean')
  isVerify: boolean;

  @Column({ nullable: true, type: 'decimal', default: 0.0 })
  balance: number;
}
