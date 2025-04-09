import React, { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries, IChartApi, ISeriesApi, IRange, Time } from "lightweight-charts";
import { useParams } from "react-router-dom";
import useGetChartData from "../../hooks/useGetChartData";
import { debounce } from 'lodash';


type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

const CoinChartGraphComponent = () => {
    const { coinId } = useParams()

    const prevOldestTime = useRef<number | null>(null);
const fetchInterval = useRef<number | null>(null);

    const [unit, setUnit] = useState<number>(15)
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    // const chartInstance = useRef<any>(null); // chart 객체
    // const candlestickSeries = useRef<any>(null); // 캔들 시리즈 객체

    // 
    const chartRef = useRef<IChartApi | null>(null); // ✅ 차트 객체 참조
    const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null); // ✅ 캔들 시리즈 참조


// 



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


    // chart.timeScale().subscribeVisibleTimeRangeChange((range) => {
    //   if(!range || !range.from) return
    //   const minTime = range.from
    //   const currentData = candlestickSeries.current?.data() ?? []
    //   console.log('current', currentData)

    //   if(currentData.length === 0) return

    //   const oldestCandle = currentData[0]
    //   if(minTime <= oldestCandle.time && hasNextPage){
    //     fetchNextPage()
    //   }
    // })

    // return () => chart.remove();
  }, [hasNextPage]);


  
  useEffect(() => {
    if(!candleSeriesRef.current || !data) return

    const combinedData = data.pages.flat() as Candle[]

    // 중복 제거
    const uniqueDataMap = new Map<number, Candle>()
    for (const candle of combinedData) {
      // console.log('candel', candle)
      uniqueDataMap.set(candle.time, candle)
    }
  
    const filtered = Array.from(uniqueDataMap.values())
      .map((candle) => ({
        ...candle,
        time: candle.time as Time
      }))
      .sort((a, b) => (a.time as number) - (b.time as number))
  
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


// import React, { useEffect, useRef, useState } from "react";
// import {
//   createChart,
//   IChartApi,
//   ISeriesApi,
//   CandlestickSeries,
// } from "lightweight-charts";
// import { useParams } from "react-router-dom";
// import useGetChartData from "../../hooks/useGetChartData";

// const CoinChartGraphComponent = () => {
//   const { coinId } = useParams();
//   const [unit, setUnit] = useState<number>(15);
//   const chartContainerRef = useRef<HTMLDivElement | null>(null);
//   const chartRef = useRef<IChartApi | null>(null);
//   const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//   } = useGetChartData(coinId ?? "", "minutes", unit);

//   const flatData = data?.pages.flat() ?? [];

//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     // 초기화
//     chartContainerRef.current.innerHTML = "";

//     const chart = createChart(chartContainerRef.current, {
//       width: chartContainerRef.current.clientWidth,
//       height: 500,
//       layout: {
//         background: { color: "#fff" },
//         textColor: "#000",
//       },
//       grid: {
//         vertLines: { color: "#eee" },
//         horzLines: { color: "#eee" },
//       },
//       timeScale: {
//         timeVisible: true,
//         secondsVisible: false,
//       },
//     });

//     const series = chart.addSeries(CandlestickSeries, {
//       upColor: "#f44336",
//       downColor: "#0000ff",
//       borderUpColor: "#f44336",
//       borderDownColor: "#0000ff",
//       wickUpColor: "#f44336",
//       wickDownColor: "#0000ff",
//     });

//     chartRef.current = chart;
//     seriesRef.current = series;

//     // 📌 유저가 왼쪽으로 이동했을 때 감지
//     chart.timeScale().subscribeVisibleTimeRangeChange((range) => {
//       if (!range?.from || flatData.length === 0 || !hasNextPage) return;

//       const oldestTime = flatData[0]?.time;
//       if (range.from <= oldestTime) {
//         fetchNextPage();
//       }
//     });

//     return () => {
//       chart.remove();
//     };
//   }, [hasNextPage]);

//   useEffect(() => {
//     if (!seriesRef.current || flatData.length === 0) return;

//     // 중복 제거 후 정렬
//     const map = new Map();
//     for (const candle of flatData) {
//       map.set(candle.time, candle);
//     }

//     const sorted = Array.from(map.values()).sort((a, b) => a.time - b.time);
//     seriesRef.current.setData(sorted);
//   }, [flatData]);

//   const handleChangeUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedUnit = Number(e.target.value);
//     setUnit(selectedUnit);
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="unit">차트 간격: </label>
//         <select id="unit" value={unit} onChange={handleChangeUnit}>
//           <option value="1">1분</option>
//           <option value="15">15분</option>
//           <option value="30">30분</option>
//           <option value="60">1시간</option>
//         </select>
//       </div>
//       <div ref={chartContainerRef} style={{ width: "100%", height: "500px" }} />
//     </div>
//   );
// };

// export default CoinChartGraphComponent;
