export enum CoinType {
  bitcoin = 'bitcoin',
  ethereum = 'ethereum',
}
export const coinType = Object.keys(CoinType);
export abstract class Coin {
  type: keyof typeof CoinType;
  quotation: number;
}
