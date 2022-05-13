import { forwardRef, Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receipt.entity';
import { UserModule } from 'src/user/user.module';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { CoreModule } from 'src/core/core.module';
import { UserBookModule } from 'src/user-book/user-book.module';
import { S3Module } from 'src/s3/s3.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receipt]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => S3Module),
    forwardRef(() => UserBookModule),
    forwardRef(() => CoreModule),
    forwardRef(() => ReceiptModule),
    forwardRef(() => DeliveryModule),
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService],
})
export class ReceiptModule {}
