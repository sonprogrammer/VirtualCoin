import React, { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import axios from "axios";
import { useParams } from "react-router-dom";

const CoinChartGraphComponent: React.FC = () => {
        const { coinId } = useParams()
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<any>(null); // chart 객체
  const candlestickSeries = useRef<any>(null); // 캔들 시리즈 객체

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 📌 차트 생성
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
    });

    // 📌 캔들스틱 시리즈 추가
    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#f44336",
      downColor: "#4caf50",
      borderUpColor: "#f44336",
      borderDownColor: "#4caf50",
      wickUpColor: "#f44336",
      wickDownColor: "#4caf50",
    });

    chartInstance.current = chart;
    candlestickSeries.current = series;

    return () => chart.remove();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        if (!candlestickSeries.current) return;
      
        try {
          const res = await axios.get(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(
              `https://api.upbit.com/v1/candles/minutes/15?market=${coinId}&count=50`
            )}`
          );
      
          const chartData = res.data
            .map((item: any) => ({
              time: Math.floor(new Date(item.candle_date_time_kst).getTime() / 1000), // UTC 타임스탬프 변환
              open: item.opening_price,
              high: item.high_price,
              low: item.low_price,
              close: item.trade_price,
            }))
            .sort((a, b) => a.time - b.time); // 🔴 오름차순 정렬 추가
      
          if (candlestickSeries.current) {
            candlestickSeries.current.setData(chartData);
          }
        } catch (error) {
          console.error("데이터 불러오기 실패:", error);
        }
      };
      

    fetchData();
  }, [candlestickSeries.current]);

  return <div ref={chartContainerRef} style={{ width: "100%", height: "500px" }} />;
};

export default CoinChartGraphComponent;
