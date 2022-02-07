import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  bookId: number;

  @Column('text')
  title: string;

  @Column('text')
  excerpt: string;

  @Column('text')
  description: string;

  @Column('text')
  imageUrl: string;

  @Column()
  buyTime: Date;
}
