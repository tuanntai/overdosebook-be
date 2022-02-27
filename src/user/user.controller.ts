import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { AddFundDto, CreateUserDto, UpdateUserDto } from './interface';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res) {
    return this.userService.create(createUserDto, res);
  }

  @Get('/getAll')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/addFund')
  async addFund(@Body() fund: AddFundDto) {
    const user = await this.userService.findOne(+fund.userId);
    const balance = user.balance + Number(fund.balance);
    if (balance < 0) {
      throw new HttpException(
        `Not enough coin`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.userService.addFund({ balance: balance, userId: fund.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
