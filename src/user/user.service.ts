import { Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { Jwt } from 'jsonwebtoken';
import { AddFundDto, CreateUserDto, UpdateUserDto } from './interface';

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
        soldBookAmount: 0,
        isVerify: false,
        avatarUrl: '',
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(`Error: ${error}`);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }
  async findOne(id: number) {
    return await this.userRepository.findOne(+id);
  }

  async findOneByOption(opts: any = {}) {
    return await this.userRepository.findOne(opts);
  }

  async update(updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    const data = await this.userRepository.findOne(updateUserDto.id);
    const isVerify = updateUserDto.isVerify || data.isVerify;
    const soldBookAmount = updateUserDto.soldBookAmount || data.soldBookAmount;
    const balance = updateUserDto.balance || data.balance;
    await this.userRepository.update(updateUserDto.id, {
      ...updateUserDto,
      isVerify,
      soldBookAmount,
      balance,
    });
    return data;
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

  async setVerify(id: number) {
    const userData = await this.userRepository.findOne(id);
    const response = await this.update({ ...userData, isVerify: true });
    console.log(response);
    return response;
  }

  async verifyToken(@Req() req, @Res() res) {
    const token = req.Body.token || req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }
    try {
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
  }
}
