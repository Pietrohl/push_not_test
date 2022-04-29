import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Coin, CoinType, coinType } from '../../common/entity/coin.entity';

export type CoinStatusDocument = CoinStatus & Document;

@Schema()
export class CoinStatus implements Coin {
  @Prop({
    type: String,
    required: true,
    enum: [...coinType],
  })
  type: keyof typeof CoinType;

  @Prop()
  quotation: number;

  @Prop({ type: Date, required: true })
  date: Date;
}

export const CoinStatusSchema = SchemaFactory.createForClass(CoinStatus);
