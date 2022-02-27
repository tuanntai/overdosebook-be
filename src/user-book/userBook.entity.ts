import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BookStatus } from './interface';

@Entity()
export class UserBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column('text')
  owner: string;

  @Column({ nullable: true })
  buyerId: number;

  @Column('text')
  title: string;

  @Column('text')
  author: string;

  @Column('text')
  description: string;

  @Column('text')
  imageUrl: string;

  @Column({ nullable: true })
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
  status: string;
}
