import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ nullable: true, type: 'float', default: 0.0 })
  balance: number;
}
