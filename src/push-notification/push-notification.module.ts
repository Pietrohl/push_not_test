import { Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { PushNotificationController } from './push-notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubscriptionSchema,
  Subscription,
} from '../database/schemas/subscription.schema';
import { Customer, CustomerSchema } from '../database/schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
})
export class PushNotificationModule {}
