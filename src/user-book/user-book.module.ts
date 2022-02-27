import { Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { UserBookController } from './user-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from './userBook.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserBook]), UserModule],
  providers: [UserBookService],
  controllers: [UserBookController],
  exports: [UserBookService],
})
export class UserBookModule {}
