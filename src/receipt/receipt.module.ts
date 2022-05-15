import { forwardRef, Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receipt.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receipt]),
    forwardRef(() => ReceiptModule),
    forwardRef(() => UserModule),
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService, TypeOrmModule],
})
export class ReceiptModule {}
