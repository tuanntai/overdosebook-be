import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { BookService } from './book.service';
import { BookAbstractListDto } from './dtos/book-abstract-list.dto';
import { AddBookDTO, BuyBookDTO } from './dtos/book-transaction.dto';
import { CreateBookDto } from './dtos/createBook.dto';
import { UpdateBookDto } from './dtos/updateBook.dto';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Post('/buybooks')
  async buyBook(@Body() buyBookDTO: BuyBookDTO) {
    return this.bookService.buyBook(buyBookDTO);
  }

  @Post('/addBook')
  async addBook(@Body() { amount, id }: AddBookDTO) {
    const book = await this.bookService.findOne(id);
    const bookAmount = book.amount - amount;
    return this.bookService.addBook({ amount: bookAmount, id: id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Get('/getList')
  findAll() {
    return this.bookService.findAll();
  }

  @Get('/allbooks/page/:page')
  getAllBooks(@Param('page') page: string): Promise<BookAbstractListDto> {
    return this.bookService.findAllBook(parseInt(page));
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.bookService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.bookService.remove(+id);
  }
}
