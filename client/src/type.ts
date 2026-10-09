

import { PriceData } from "./context/CoinPrice";

export interface UpbitCandle {
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  low_price_string: string;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  unit: number;
}

export interface Coin {
  coinKoreanName: string;
  coinMarket: string;
  price: PriceData
};

export interface UserCoins {
    amount: number;
    avgBuyPrice: number;
    market: string;
    name: string
}

export interface UserInfo {
    _id: string;
    name: string;
}

export interface UserAsset {
    _id: string;
    cash: number;
    coins: UserCoins[]
    userId: UserInfo
}
export interface AllUserAssetRespons {
    message: string;
    allUser: UserAsset[]
}

