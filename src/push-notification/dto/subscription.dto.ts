import { PushSubscription } from 'web-push';

export abstract class SubscriptionDTO implements PushSubscription {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}
