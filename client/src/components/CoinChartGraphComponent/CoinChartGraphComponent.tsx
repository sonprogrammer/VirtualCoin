import React, { useEffect, useRef, useState } from "react";
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

    const prevOldestTime = useRef<number | null>(null);

    const [unit, setUnit] = useState<number>(15)
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null); // ✅ 차트 객체 참조
    const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null); // ✅ 캔들 시리즈 참조


    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      isError,
    } = useGetChartData(coinId ?? '', 'minutes', unit);



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

    // 📌 캔들스틱 시리즈 추가
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
    if(!range || !range.from || !hasNextPage) return

    const minTime = range.from
    const currentData = candleSeriesRef.current?.data() ?? []
    if(currentData.length === 0) return

    const oldestCandle = currentData[0]
    if(Number(minTime) <=Number(oldestCandle.time) && prevOldestTime.current !== Number(oldestCandle.time)){
      debouncedFetch()
      prevOldestTime.current = Number(oldestCandle.time)
    }
   }

   timeScale.subscribeVisibleTimeRangeChange(onVisibleRangeChange)

   return() => {
    timeScale.unsubscribeVisibleTimeRangeChange(onVisibleRangeChange)
    chart.remove()
   }
  }, [hasNextPage]);


  useEffect(() => {
    if(!candleSeriesRef.current || !data) return

    const combinedData = data.pages.flat() as Candle[]

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
      const adjustedTime = convertToKSTTimestamp(candle.time) // ✅ KST로 조정

      const updatedCandle = {
        ...candle,
        time: adjustedTime,
      };

      return updatedCandle;
    })
    .sort((a, b) => a.time - b.time);

  // console.log('✅ Filtered data (KST 적용):', filtered);

      // 디버깅을 위한 로깅
    // console.log('차트 데이터 샘플 (첫 3개):', filtered.slice(0, 3).map(candle => {
    //   const date = new Date(candle.time * 1000);
    //   return {
    //     ...candle,
    //     readableTime: date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    //   };
    // }));
  
    candleSeriesRef.current.setData(filtered)
  },[data])


  const handleChangeUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUnit = Number(e.target.value)
    setUnit(selectedUnit)
  }

  return (
    <div>
      <div>
        <label htmlFor="unit">차트</label>
        <select id="unit" value={unit} onChange={handleChangeUnit}>
          <option value="1">1분</option>
          <option value="15">15분</option>
          <option value="30">30분</option>
          <option value="60">1시간</option>
        </select>
      </div>
    <div ref={chartContainerRef} style={{ width: "100%", height: "500px" }} />

    </div>
  );
};

export default CoinChartGraphComponent;

