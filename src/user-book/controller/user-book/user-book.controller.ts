import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserBookService } from 'src/user-book/services/user-book/user-book.service';

@ApiTags('user-book')
@Controller('user-book')
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}
  //   @UseGuards(JwtAuthGuard)
  @Get('/getBookByUserId/:userId')
  findBookByUserId(@Param('userId') userId: number) {
    return this.userBookService.findBookByUserId(userId);
  }

  @Get('/recentlyBuyBook')
  recentlyBuyBook() {
    return this.userBookService.recentlyBuyBook();
  }
}
