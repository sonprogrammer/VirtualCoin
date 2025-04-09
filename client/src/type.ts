// types.ts

export type TimeUnit = 'minutes' | 'days' | 'weeks' | 'months';

export type TimeInterval = {
  unit: TimeUnit;
  value: number;
  label: string;
};

export type CandleData = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

// API 응답 데이터 인터페이스
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

export const INTERVALS: TimeInterval[] = [
  { unit: 'minutes', value: 1, label: '1분' },
  { unit: 'minutes', value: 15, label: '15분' },
  { unit: 'minutes', value: 30, label: '30분' },
  { unit: 'minutes', value: 60, label: '1시간' },
  { unit: 'days', value: 1, label: '일' },
  { unit: 'weeks', value: 1, label: '주' },
  { unit: 'months', value: 1, label: '월' }
];