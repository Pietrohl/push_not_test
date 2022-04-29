import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CoinType } from '../common/entity/coin.entity';
import { Order, OrderDocument } from '../database/schemas/order.schema';
import { Model } from 'mongoose';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async findEmailsByCoin(coin: keyof typeof CoinType): Promise<string[]> {
    return this.orderModel
      .find({ coin })
      .distinct('email', function (error, results) {
        console.log(results);
        !!error && console.log(error);
      });
  }
}
