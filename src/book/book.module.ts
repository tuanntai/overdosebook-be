import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBookModule } from 'src/user-book/user-book.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UserModule, UserBookModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
