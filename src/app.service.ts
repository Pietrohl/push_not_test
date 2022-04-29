import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoinType } from './common/entity/coin.entity';
import {
  CoinStatus,
  CoinStatusDocument,
} from './database/schemas/coin-status.schema';
@Injectable()
export class AppService {
  constructor(
    @InjectModel(CoinStatus.name)
    private coinStatusRepository: Model<CoinStatusDocument>,
  ) {}

  async updateCoinStatus(params: CoinStatus) {
    const coinStatus = new this.coinStatusRepository(params);
    return coinStatus.save();
  }

  async checkFluctuation(coin: keyof typeof CoinType) {
    const status = await this.coinStatusRepository.find({ type: coin });

    return {
      isNotify: true,
      fluctuation: 0.07,
      coin: status[0].type as keyof typeof CoinType,
    };
  }
}
