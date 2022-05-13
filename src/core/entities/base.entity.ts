import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: Date;
}
