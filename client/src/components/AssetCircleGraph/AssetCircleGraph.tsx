import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import coinData from './mockupData'

// chart.js의 기본 구성 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const AssetCircleGraph = () => {
  // 전체 자산 비율을 계산하는 함수
  const totalValue = coinData.reduce((acc, coin) => acc + coin.value, 0);

  // Chart.js에 사용할 데이터 준비
  const data = {
    labels: coinData.map(coin => coin.name), // 코인 이름
    datasets: [
      {
        data: coinData.map(coin => coin.value), // 코인의 자산 값
        backgroundColor: ['#FF8042', '#00C49F', '#0088FE', '#FFBB28', '#FF00FF'], // 각 파이 조각의 색상
        hoverOffset: 4,
      },
    ],
  };

  // Chart.js 옵션 (툴팁, 레전드 등)
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `${context.label}: ${value} KRW`;
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h3>자산 비율</h3>
      <Pie data={data} options={options} />

      <div>
        {coinData.map((coin, index) => (
          <div key={index}>
            <p>{coin.name}: {((coin.value / totalValue) * 100).toFixed(2)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetCircleGraph;
