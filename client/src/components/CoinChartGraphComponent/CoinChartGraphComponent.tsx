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
        background: { color: "#fff" },
        textColor: "#000",
      },
      grid: {
        vertLines: { color: "#EAEAEA" },
        horzLines: { color: "#EAEAEA" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#f44336",
      downColor: "#0000ff",
      borderUpColor: "#f44336",
      borderDownColor: "#0000ff",
      wickUpColor: "#f44336",
      wickDownColor: "#0000ff",
    });

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
      // originalTime은 초 단위
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
    <div>
      <div>
        <label htmlFor="unit">차트</label>
        <select id="type" value={type}
         onChange={(e) => setType(e.target.value as 'minutes' | 'days' | 'weeks' | 'months')}
        >
          <option value="minutes">분</option>
          <option value="days">일</option>
          <option value="weeks">주</option>
          <option value="months">월</option>

        </select>
        {type === 'minutes' && (
          <>
            <label htmlFor="unit">단위</label>
            <select id="unit" value={unit} onChange={(e) => setUnit(Number(e.target.value))}>
              <option value="1">1분</option>
              <option value="15">15분</option>
              <option value="30">30분</option>
              <option value="60">1시간</option>
            </select>
          </>
        )}
      </div>
      <div ref={chartContainerRef} style={{ width: "100%", height: "500px" }} />

    </div>
  );
};

export default CoinChartGraphComponent;

