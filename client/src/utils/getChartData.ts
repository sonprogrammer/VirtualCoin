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
    let url = `${import.meta.env.VITE_API_URL}/api/chart?market=${market}&type=${type}&count=${count}`;

    if (type === 'minutes' && unit) {
      url += `&unit=${unit}`
    }
  
    if (to) {
      url += `&to=${to}`;
    }


  const res = await axios.get(url);


  const mapped = res.data.map((item: any) => ({
    time: Math.floor(new Date(item.candle_date_time_kst).getTime() / 1000),

    open: item.opening_price,
    high: item.high_price,
    low: item.low_price,
    close: item.trade_price,
  }));

  mapped.sort((a:any, b:any) => a.time - b.time);


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
