import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from 'src/core/core.module';
import { ReceiptModule } from 'src/receipt/receipt.module';
import { UserBookModule } from 'src/user-book/user-book.module';
import { UserModule } from 'src/user/user.module';
import { DeliveryController } from './delivery.controller';
import { Delivery } from './delivery.entity';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery]),
    forwardRef(() => UserBookModule),
    forwardRef(() => UserModule),
    forwardRef(() => CoreModule),
    forwardRef(() => ReceiptModule),
    forwardRef(() => DeliveryModule),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports: [DeliveryService, TypeOrmModule],
})
export class DeliveryModule {}
