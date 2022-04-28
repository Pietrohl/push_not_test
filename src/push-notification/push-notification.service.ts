import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import * as webpush from 'web-push';
import { SubscriptionDTO } from './dto/subscription.dto';
@Injectable()
export class PushNotificationService {
  private webpushService: typeof webpush;
  constructor() {
    config();
    const publicVapidKey = process.env.PUSH_PUBLIC_KEY;
    const privateVapidKey = process.env.PUSH_PRIVATE_KEY;
    webpush.setVapidDetails(
      'mailto:pietro_henrique4@hotmail.com',
      publicVapidKey,
      privateVapidKey,
    );
    this.webpushService = webpush;
  }

  async sendNotification(subscription: SubscriptionDTO, payload: any) {
    this.webpushService
      .sendNotification(subscription, payload)
      .catch((err) => console.error(err));
  }
}
