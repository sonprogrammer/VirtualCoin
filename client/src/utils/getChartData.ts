import axios from "axios";

export type CandleType = 'minutes' | 'days' | 'weeks' | 'months' | 'years';

interface getChartParams {
  market: string;
  type: CandleType;
  unit?: number; // 분봉 차트일 때만
  to?: string;
  count?: number;
}

const getChartData = async ({ market, type, unit, to, count = 200 }: getChartParams) => {
    let url = `http://localhost:3000/api/chart?market=${market}&type=${type}&count=${count}`;

    if (type === 'minutes' && unit) {
      url += `&unit=${unit}`
    }
  
    if (to) {
      url += `&to=${to}`;
    }


  const res = await axios.get(url);

  // 🟡 최신 → 과거 순이므로 우선 정렬
  const mapped = res.data.map((item: any) => ({
    time: Math.floor(new Date(item.candle_date_time_utc).getTime() / 1000),
    open: item.opening_price,
    high: item.high_price,
    low: item.low_price,
    close: item.trade_price,
  }));

  mapped.sort((a, b) => a.time - b.time);

const unique: typeof mapped = [];
for (let i = 0; i < mapped.length; i++) {
  if (i === 0 || mapped[i].time !== mapped[i - 1].time) {
    unique.push(mapped[i]);
  } else {
    console.warn("⚠️ 중복 발견:", mapped[i].time);
  }
}

  return unique;
};

export default getChartData;
