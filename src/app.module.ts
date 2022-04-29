import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { config } from 'dotenv';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { Subscription } from 'rxjs';
import {
  CoinStatus,
  CoinStatusSchema,
} from './database/schemas/coin-status.schema';
import { Order, OrderSchema } from './database/schemas/order.schema';
import { SubscriptionSchema } from './database/schemas/subscription.schema';
config();
@Module({
  imports: [
    PushNotificationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
    }),

    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: CoinStatus.name, schema: CoinStatusSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, OrderService],
  exports: [OrderService],
})
export class AppModule {}
