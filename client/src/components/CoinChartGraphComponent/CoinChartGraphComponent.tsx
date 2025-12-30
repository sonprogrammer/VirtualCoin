import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries, IChartApi, ISeriesApi, IRange, Time } from "lightweight-charts";
import { useParams } from "react-router-dom";
import useGetChartData from "../../hooks/useGetChartData";
import { debounce } from 'lodash';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from 'dayjs/plugin/timezone'



type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};



dayjs.extend(utc);
dayjs.extend(timezone);

const CoinChartGraphComponent = () => {
  const { coinId } = useParams()

  const prevOldestTime = useRef<number | null>(null)

  const [type, setType] = useState<'minutes' | 'days' | 'weeks' | 'months'>('minutes');
  const [unit, setUnit] = useState<number>(15) //minute 용
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)


  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useGetChartData(coinId ?? '', type, unit);



  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartContainerRef.current.innerHTML = '';


    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { color: "#09090b" }, 
        textColor: "#a1a1aa", 
      },
      grid: {
        vertLines: { color: "#18181b" }, 
        horzLines: { color: "#18181b" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "#27272a", 
      },
      rightPriceScale: {
        borderColor: "#27272a",
      },
    })

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#ef4444",       
      downColor: "#38bdf8",   
      borderUpColor: "#ef4444",
      borderDownColor: "#38bdf8",
      wickUpColor: "#ef4444",
      wickDownColor: "#38bdf8",
    })

    chartRef.current = chart;
    candleSeriesRef.current = series;

    const timeScale = chart.timeScale()

    const debouncedFetch = debounce(() => {
      if (hasNextPage) {
        fetchNextPage();
      }
    }, 1000);

    const onVisibleRangeChange = (range: IRange<Time> | null) => {
      if (!range || !range.from || !hasNextPage) return

      const minTime = range.from
      const currentData = candleSeriesRef.current?.data() ?? []
      if (currentData.length === 0) return

      const oldestCandle = currentData[0]
      if (Number(minTime) <= Number(oldestCandle.time) && prevOldestTime.current !== Number(oldestCandle.time)) {
        debouncedFetch()
        prevOldestTime.current = Number(oldestCandle.time)
      }
    }

    timeScale.subscribeVisibleTimeRangeChange(onVisibleRangeChange)

    return () => {
      timeScale.unsubscribeVisibleTimeRangeChange(onVisibleRangeChange)
      chart.remove()
    }
  }, [hasNextPage]);


  useEffect(() => {
    if (!candleSeriesRef.current || !data) return


    const combinedData = data?.pages.flat() ?? []

    // 중복 제거
    const uniqueDataMap = new Map<number, Candle>()
    for (const candle of combinedData) {
      uniqueDataMap.set(candle.time, candle)
    }




    function convertToKSTTimestamp(originalTime: number): number {
      const KST_OFFSET_IN_SECONDS = 9 * 60 * 60; // 9시간
      return originalTime + KST_OFFSET_IN_SECONDS;
    }

    const filtered = Array.from(uniqueDataMap.values())
      .map((candle) => {
        const adjustedTime = convertToKSTTimestamp(candle.time)

        const updatedCandle = {
          ...candle,
          time: adjustedTime ,
        };

        return updatedCandle;
      })
      .sort((a, b) => a.time - b.time);

   

    candleSeriesRef.current.setData(filtered)
  }, [data])


  const resizeChart = () => {
    if (chartContainerRef.current && chartRef.current) {
      chartRef.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    }
  };
  useEffect(() => {
    window.addEventListener('resize', resizeChart);
    return () => {
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  return (
    <div className="w-full bg-zinc-950 rounded-xl overflow-hidden border border-zinc-900">

      <div className="flex items-center gap-4 p-3 bg-zinc-900/50 border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <label htmlFor="type" className="text-xs font-bold text-zinc-500">차트</label>
          <select 
            id="type" 
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="bg-zinc-800 text-zinc-200 text-xs p-1 px-2 rounded border border-zinc-700 outline-none"
          >
            <option value="minutes">분</option>
            <option value="days">일</option>
            <option value="weeks">주</option>
            <option value="months">월</option>
          </select>
        </div>

        {type === 'minutes' && (
          <div className="flex items-center gap-2">
            <label htmlFor="unit" className="text-xs font-bold text-zinc-500">단위</label>
            <select 
              id="unit" 
              value={unit} 
              onChange={(e) => setUnit(Number(e.target.value))}
              className="bg-zinc-800 text-zinc-200 text-xs p-1 px-2 rounded border border-zinc-700 outline-none"
            >
              <option value="1">1분</option>
              <option value="15">15분</option>
              <option value="30">30분</option>
              <option value="60">1시간</option>
            </select>
          </div>
        )}
      </div>

      <div ref={chartContainerRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default CoinChartGraphComponent;

