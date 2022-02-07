import { Module } from '@nestjs/common';
import { UserBookService } from './services/user-book/user-book.service';
import { UserBookController } from './controller/user-book/user-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from './entities/userBook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserBook])],
  providers: [UserBookService],
  controllers: [UserBookController],
  exports: [UserBookService],
})
export class UserBookModule {}
