import { Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { PushNotificationController } from './push-notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubscriptionSchema,
  Subscription,
} from '../database/schemas/subscription.schema';
import {
  CoinStatus,
  CoinStatusSchema,
} from '../database/schemas/coin-status.schema';
import { Order, OrderSchema } from '../database/schemas/order.schema';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: CoinStatus.name, schema: CoinStatusSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    OrderModule,
  ],
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
