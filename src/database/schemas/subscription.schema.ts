import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
  keys: Record<'p256dh' | 'auth', string>;

  @Prop()
  client: string;

  @Prop()
  customer: string;

  @Prop({ type: Date, required: true })
  lastStatusNotification: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
