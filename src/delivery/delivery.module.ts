import { forwardRef, Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './delivery.entity';
import { ReceiptModule } from 'src/receipt/receipt.module';
import { UserBookModule } from 'src/user-book/user-book.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { S3Module } from 'src/s3/s3.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => S3Module),
    forwardRef(() => UserBookModule),
    forwardRef(() => CoreModule),
    forwardRef(() => ReceiptModule),
    forwardRef(() => DeliveryModule),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports: [DeliveryService],
})
export class DeliveryModule {}
