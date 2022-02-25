import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  author: string;

  @Column('text')
  owner: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  imageUrl: string;

  @Column({ nullable: true })
  price: number;

  @Column()
  timeAdded: Date;
}
