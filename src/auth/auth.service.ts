import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { LoginDto } from './dtos/login.dto';
import { ErrorException } from 'src/error/error.exception';
import { LoginReturnDto } from './dtos/loginReturnDto';
import { TOKEN_EXPIRES_IN } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validatePassword(user: User, password: string): boolean {
    return bcrypt.compareSync(password, user.password);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findOneByOption({ username });
    if (!user) {
      throw new ErrorException('No user');
    }
    if (!this.validatePassword(user, password)) {
      throw new ErrorException('Password wrong');
    }
    return this.createToken(user);
  }

  async createToken(user: User): Promise<LoginReturnDto> {
    const accessToken = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
    return {
      expiresIn: TOKEN_EXPIRES_IN,
      accessToken,
      userId: user.id,
    };
  }
}
