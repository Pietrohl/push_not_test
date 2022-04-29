import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { CoinStatus } from './database/schemas/coin-status.schema';
import { PushNotificationService } from './push-notification/push-notification.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @Post('coin-status')
  async updateCoinStatus(@Body() coinStatus: Omit<CoinStatus, 'date'>) {
    const coin = await this.appService.updateCoinStatus({
      ...coinStatus,
      date: new Date(),
    });

    const statusUpdate = await this.appService.checkFluctuation(coin.type);

    statusUpdate.isNotify &&
      this.pushNotificationService.sendUpdateNotification(statusUpdate);
  }
}
