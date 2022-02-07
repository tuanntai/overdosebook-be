import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { OwnerBook, User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AddFundDto } from './dto/addFund.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, @Res() res) {
    const { password } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    try {
      const data = await this.userRepository.save({
        ...createUserDto,
        password: hashPassword,
        balance: 0,
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(`Error: ${error}`);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneByOption(opts: any = {}) {
    return await this.userRepository.findOne(opts);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async addFund(addFundDto: AddFundDto) {
    await this.userRepository.update(addFundDto.userId, {
      balance: addFundDto.balance,
    });
    const userInfo = await this.findOne(addFundDto.userId);
    return userInfo;
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
