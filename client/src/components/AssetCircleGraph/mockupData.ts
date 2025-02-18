const coins = [
  {
    market: 'BTC/USDT',
    price: 50000,
    amount: 50
  },
  {
    market: 'ETH/USDT',
    price: 3000,
    amount: 1000
  },
  {
    market: 'XRP/USDT',
    price: 4000,
    amount: 10000
  },
  {
    market: 'ADA/USDT',
    price: 1.5,
    amount: 10
  },
  {
    market: 'DOT/USDT',
    price: 30,
    amount: 2000
  },
];

// 전체 투자 금액 계산
const total_bid = coins.reduce((sum, coin) => sum + (coin.price * coin.amount), 0);

// totalbid 추가
export { coins, total_bid };
