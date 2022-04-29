import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CoinType, coinType } from '../../common/entity/coin.entity';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  id: string;

  @Prop()
  customer: string;

  @Prop({
    type: String,
    required: true,
    enum: ['processing', 'completed', 'failed'],
  })
  status: string;

  @Prop()
  quantity: number;

  @Prop({
    type: String,
    required: true,
    enum: [...coinType],
  })
  coin: keyof typeof CoinType;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
