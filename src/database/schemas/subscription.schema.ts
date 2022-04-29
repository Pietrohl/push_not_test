import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Customer } from './customer.schema';
export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop()
  endpoint: string;

  @Prop(
    raw({
      p256dh: { type: String },
      auth: { type: String },
    }),
  )
  keys: Record<string, any>;

  @Prop()
  client: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  owner: Customer;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
