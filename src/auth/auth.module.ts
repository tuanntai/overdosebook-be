import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants, TOKEN_EXPIRES_IN } from './constants';
import { AuthController } from './auth.controller';
import { S3Module } from 'src/s3/s3.module';
import { CoreModule } from 'src/core/core.module';
import { ReceiptModule } from 'src/receipt/receipt.module';
import { UserBookModule } from 'src/user-book/user-book.module';
import { DeliveryModule } from 'src/delivery/delivery.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: TOKEN_EXPIRES_IN },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => S3Module),
    forwardRef(() => UserBookModule),
    forwardRef(() => CoreModule),
    forwardRef(() => ReceiptModule),
    forwardRef(() => DeliveryModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
