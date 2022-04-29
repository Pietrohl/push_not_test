import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from '../database/schemas/subscription.schema';
import * as webpush from 'web-push';
import { SubscriptionDTO } from './dto/subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../database/schemas/order.schema';
import { NotificationPayloadDTO } from './dto/notification-payload.dto';
import { StatusUpdate } from '../common/entity/statusUpdate.entity';
import { OrderService } from '../order/order.service';
@Injectable()
export class PushNotificationService {
  private webpushService: typeof webpush;
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
    private orderService: OrderService,
  ) {
    const publicVapidKey = process.env.PUSH_PUBLIC_KEY;
    const privateVapidKey = process.env.PUSH_PRIVATE_KEY;
    webpush.setVapidDetails(
      'mailto:pietro_henrique4@hotmail.com',
      publicVapidKey,
      privateVapidKey,
    );
    this.webpushService = webpush;
  }

  async create(subscription: SubscriptionDTO): Promise<Subscription> {
    const createSubscription = new this.subscriptionModel(subscription);

    return createSubscription.save();
  }

  async sendUpdateNotification(update: StatusUpdate) {
    const emails = await this.orderService.findEmailsByCoin(update.coin);

    const subscription = await this.subscriptionModel.find({
      custumer: emails,
    });

    const now = new Date();
    const TWELVE_HOURS = 12 * 60 * 60 * 1000;
    return Promise.all(
      subscription.map((subs) => {
        if (
          now.getTime() - subs.lastStatusNotification.getTime() <=
          TWELVE_HOURS
        ) {
          this.sendNotification(subs, {
            title: `New ${update.fluctuation > 0 ? 'rise' : 'drop'} from ${
              update.coin
            }`,
            body: `${update.coin} experienced a ${
              update.fluctuation > 0 ? 'rise' : 'drop'
            } of ${Math.trunc(update.fluctuation * 100)} in the pas 12hrs.`,
          });
        }
      }),
    );
  }

  async sendOrderNotification(order: Order) {
    const { customer, coin, id } = order;

    const subscriptions = await this.subscriptionModel
      .find()
      .where({ customer });

    const payload: NotificationPayloadDTO = {
      title: 'Your order was processed!',
      body: `Congratulations! Your order number ${id} for ${coin} was completed.`,
    };

    return Promise.all(
      subscriptions.map((subs) => this.sendNotification(subs, payload)),
    );
  }

  async sendNotification(
    subscription: SubscriptionDTO,
    payload: NotificationPayloadDTO,
  ) {
    this.webpushService
      .sendNotification(subscription, JSON.stringify(payload))
      .catch((err) => console.error(err));
  }
}
