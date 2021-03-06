import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { AuthModule } from 'src/auth/auth.module';
import { S3Module } from 'src/s3/s3.module';
import { UserBookModule } from 'src/user-book/user-book.module';
import { CoreModule } from 'src/core/core.module';
import { ReceiptModule } from 'src/receipt/receipt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => S3Module),
    forwardRef(() => UserBookModule),
    forwardRef(() => CoreModule),
    forwardRef(() => ReceiptModule),
    forwardRef(() => DeliveryModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
