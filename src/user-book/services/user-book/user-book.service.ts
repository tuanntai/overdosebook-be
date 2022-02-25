import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserBookDto } from 'src/user-book/dto/createUserBook.dto';
import { UserBook } from 'src/user-book/entities/userBook.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserBookService {
  constructor(
    @InjectRepository(UserBook)
    private readonly userBookRepository: Repository<UserBook>,
  ) {}

  async create(createUserBookDto: CreateUserBookDto) {
    return await this.userBookRepository.save(createUserBookDto);
  }

  async findAll() {
    return await this.userBookRepository.find();
  }

  async findBookByUserId(userId: number) {
    const listUserBook = await this.findAll();
    const ownerBook = listUserBook.filter((item) => item.userId == userId);
    return ownerBook;
  }

  async recentlyBuyBook() {
    const listUserBook = (await this.findAll()).reverse();
    console.log(listUserBook);
    let recentlyBook = [];
    for (let i = 0; i < listUserBook.length - 1; i++) {
      if (listUserBook[i].bookId !== listUserBook[i + 1].bookId) {
        recentlyBook.push(listUserBook[i]);
      }
    }

    return recentlyBook.slice(0, 5);
  }
}
