import { Module } from '@nestjs/common';

import {
  InvoiceController,
  OrderController,
} from './controllers';
import { KitController } from './controllers/order';
import { MessagingModule } from './messaging';
import { PersistenceModule } from './persistence';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [InvoiceController, OrderController, KitController],
  providers: [],
  exports: [],
})
export class OrderManagementModule {}
