import { atom } from 'recoil';


export interface PriceData {
    trade_price: number; // 현재가
    change_rate: number; // 전일 대비 퍼센트
    acc_price: number; // 거래대금 - 원래이름 아닌데 내가 바꿔놈
    change_price: number; // 전일 대비 가격 변동
    trade_volume: number; // 거래량
    high_price: number; // 고가
    low_price: number; // 저가
  }


export const CoinPrice = atom<{ [key: string]: PriceData }>({
  key: 'coinPrice', 
  default: {},         
});