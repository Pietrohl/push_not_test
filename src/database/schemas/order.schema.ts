import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Customer } from './customer.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  owner: Customer;

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
    enum: ['bitcoin', 'etherium'],
  })
  coin: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
