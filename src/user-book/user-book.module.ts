import { forwardRef, Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { UserBookController } from './user-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from './userBook.entity';
import { UserModule } from 'src/user/user.module';
import { ReceiptModule } from 'src/receipt/receipt.module';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { CoreModule } from 'src/core/core.module';
import { AuthModule } from 'src/auth/auth.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBook]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    // forwardRef(() => S3Module),
    forwardRef(() => UserBookModule),
    forwardRef(() => CoreModule),
    forwardRef(() => ReceiptModule),
    forwardRef(() => DeliveryModule),
  ],
  controllers: [UserBookController],
  providers: [UserBookService],
  exports: [TypeOrmModule, UserBookService],
})
export class UserBookModule {}
