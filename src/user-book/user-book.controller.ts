import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserBookService } from 'src/user-book/user-book.service';
import { BuyBookDto, CreateUserBookDto } from './interface';

@ApiTags('book')
@Controller('user-book')
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}
  // @UseGuards(JwtAuthGuard)
  @Post('/')
  createSellBook(@Body() createSellBook: CreateUserBookDto) {
    return this.userBookService.create(createSellBook);
  }

  @Get('/getBookAnalyze')
  async getBookAnalyze() {
    return await this.userBookService.getBookAnalyze();
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/buy')
  buyBook(@Body() payload: BuyBookDto) {
    return this.userBookService.buyBook(payload);
  }

  @Get('/getAll')
  async getAllBook(@Query() { search, order, page, size, status }) {
    return this.userBookService.getAllPaging(
      { search, order, page, size, status },
      ['title', 'author'],
    );
  }

  @Get('/getBookByUserId/:userId')
  findBookByUserId(@Param('userId') userId: string) {
    return this.userBookService.findBookByUserId(userId);
  }

  @Get('/:id')
  async getBookById(@Param('id') id: string) {
    return this.userBookService.findById(id);
  }

  @Get('/recentlyBuyBook')
  async recentlyBuyBook() {
    return await this.userBookService.recentlyBuyBook();
  }
}
