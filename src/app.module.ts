import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { config } from 'dotenv';
import { Connection } from 'mongoose';
config();
@Module({
  imports: [
    PushNotificationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
