import { Book } from 'src/book/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  username: string;

  @Column('text')
  password: string;

  @Column({ nullable: true })
  balance: number;
}
@Entity()
export class OwnerBook {
  @Column('text')
  id: number;

  @Column('text')
  bookId: number;
}
