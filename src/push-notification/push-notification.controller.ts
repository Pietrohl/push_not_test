import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { SubscriptionDTO } from './dto/subscription.dto';
import { PushNotificationService } from './push-notification.service';

@Controller('push')
export class PushNotificationController {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @Post('subscribe')
  async subscribe(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() subscription: SubscriptionDTO,
  ) {
    res.status(201);
    const payload = JSON.stringify({
      title: 'Test Push Notification Subscription',
    });
    console.log(subscription);
    this.pushNotificationService.sendNotification(subscription, payload);
  }
}
