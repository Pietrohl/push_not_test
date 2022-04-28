import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PushNotificationModule } from './push-notification/push-notification.module';

@Module({
  imports: [
    PushNotificationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
