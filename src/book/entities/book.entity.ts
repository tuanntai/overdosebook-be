import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  author: string;

  @Column('text')
  publisher: string;

  @Column('text')
  title: string;

  @Column('text')
  excerpt: string;

  @Column('text')
  description: string;

  @Column('text')
  imageUrl: string;

  @Column({ nullable: true })
  price: number;

  @Column()
  amount: number;

  @Column({ nullable: true })
  discountPercent: number;
}
