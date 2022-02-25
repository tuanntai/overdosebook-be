import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PER_PAGE } from 'src/common/constant/constants';
import { FindManyOptions, Repository } from 'typeorm';
import {
  BookAbstractDto,
  BookAbstractListDto,
} from './dtos/book-abstract-list.dto';
import { BookDetailDto } from './dtos/bookDetail.dto';
import { CreateBookDto } from './dtos/createBook.dto';
import { UpdateBookDto } from './dtos/updateBook.dto';
import { User } from 'src/user/entities/user.entity';
import { Book } from './entities/book.entity';
import { AddBookDTO, BuyBookDTO } from './dtos/book-transaction.dto';
import { UserService } from 'src/user/user.service';
import { UserBookService } from 'src/user-book/services/user-book/user-book.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly userServiceRepository: UserService,
    private readonly userBookServiceRepository: UserBookService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const timeAdded = new Date();
    await this.bookRepository.save({ ...createBookDto, timeAdded: timeAdded });
    return 'Successfully !';
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.update(id, updateBookDto);
  }

  async findAll() {
    const data = await this.bookRepository.find();
    return data;
  }

  async findOne(id: number): Promise<BookDetailDto> {
    const book = await this.bookRepository.findOne({ id });
    if (!book) {
      throw new HttpException(
        `id ${id} is not exist!`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const data: BookDetailDto = {
      id: book.id,
      title: book.title,
      description: book.description,
      excerpt: book.excerpt,
      price: book.price,
      discountPercent: book.discountPercent,
      imageUrl: book.imageUrl,
      author: book.author,
      publisher: book.publisher,
      amount: book.amount,
    };
    return data;
  }

  async findAllBook(page: number): Promise<BookAbstractListDto> {
    const options: FindManyOptions = {
      order: { id: 'DESC' },
      skip: page * PER_PAGE,
      take: PER_PAGE,
    };
    const allBooks = await this.bookRepository.find(options);
    const data = [];
    Promise.all(
      allBooks.map((x) => {
        const book: BookAbstractDto = {
          id: x.id,
          title: x.title,
          excerpt: x.excerpt,
          author: x.author,
          description: x.description,
          discountPercent: x.discountPercent,
          imageUrl: x.imageUrl,
          price: x.price,
          amount: x.amount,
          publisher: x.publisher,
        };
        data.push(book);
      }),
    );
    const res: BookAbstractListDto = {
      totalPage: Math.ceil(allBooks.length / PER_PAGE) + 1,
      totalItem: allBooks.length,
      data,
    };
    console.log(res.totalPage);
    console.log(res.totalItem);
    return res;
  }

  async remove(id: number): Promise<number> {
    const book = await this.bookRepository.findOne({ id });
    if (!book) {
      throw new HttpException(
        `id ${id} is not exist!`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.bookRepository.delete({ id });
    return id;
  }

  async addBook({ amount, id }: AddBookDTO) {
    if (amount < 0) {
      throw new HttpException(
        `Not Enough Book`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.bookRepository.update(id, { amount: amount });
  }

  async buyBook(buyBookDTO: BuyBookDTO) {
    const book = await this.findOne(buyBookDTO.bookId);
    const user = await this.userServiceRepository.findOne(buyBookDTO.userId);
    const cost =
      buyBookDTO.amount * ((book.price * (100 - book.discountPercent)) / 100);
    const time = new Date();

    if (user.balance - cost >= 0) {
      if (book.amount >= 0) {
        for (let i = 0; i < buyBookDTO.amount; i++) {
          this.userBookServiceRepository.create({
            ...book,
            bookId: book.id,
            userId: user.id,
            buyTime: time,
          });
        }
        await this.userServiceRepository.addFund({
          balance: user.balance - cost,
          userId: buyBookDTO.userId,
        });
        await this.addBook({
          amount: book.amount - buyBookDTO.amount,
          id: buyBookDTO.bookId,
        });
        const newBook = await this.findOne(buyBookDTO.bookId);
        return newBook.amount;
      } else {
        throw new HttpException(
          `Not Enough Book`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } else {
      throw new HttpException(
        `Not Enough Money`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
