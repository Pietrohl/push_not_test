import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription } from 'rxjs';
import {
  CoinStatus,
  CoinStatusSchema,
} from '../database/schemas/coin-status.schema';
import { Order, OrderSchema } from '../database/schemas/order.schema';
import { SubscriptionSchema } from '../database/schemas/subscription.schema';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: CoinStatus.name, schema: CoinStatusSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
