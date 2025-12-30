
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {  ChartSide, GraphWrapper, LegendItem, LegendSide, StyledText } from './style';
import useGetAssetData from '../../hooks/useGetAssetData';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);


function AssetCircleGraph() {
  const assetData = useGetAssetData()
  
  if (!assetData || !assetData.data) {
    return <div>Loading...</div>; 
  }
  
  const coins = assetData?.data.coins.filter((c:any) => c.amount !== 0) || []

  

  // *코인별 평가금액
  const coinValue = coins.map((coin: any) => ({
    market: coin.market.split('-')[1],
    value: coin.amount * coin.avgBuyPrice
  }))

  const totalCoinValue = coinValue.reduce((sum: number, coin:any) => sum+coin.value, 0)

  const coinsRate = totalCoinValue > 0 ? coinValue.map((coin: any) => ({
    market: coin.market,
    value: Number(((coin.value / totalCoinValue) * 100).toFixed(2))
  })) : []

  

  const sortedCoinsRates = coinsRate.sort((a:any, b: any) => b.value - a.value)


  const generatedColors = (count: number) => {
    return Array.from({length: count}, (_, i) => `hsla(${(i * 137.5) % 360}, 65%, 65%, 0.8)`);
  }

  const data = coins.length === 0 ? {
    labels: ['자산 없음'],
    datasets: [{
      data: [100],
      backgroundColor: ['#27272a'], // zinc-800
      borderWidth: 0
    }]
  } : {
    labels: sortedCoinsRates.map((coin:any) => coin.market),
    datasets: [{
      data: sortedCoinsRates.map((coin: any) => coin.value),
      backgroundColor: generatedColors(sortedCoinsRates.length),
      hoverOffset: 10,
      borderWidth: 2,
      borderColor: '#09090b', // zinc-950 (배경색과 맞춰서 도넛 조각 분리)
    }]
  }

  const options = {
    cutout: '70%', // 도넛 두께 조절 (중앙 글씨를 위해 넓게)
    plugins: {
      legend: { display: false
      },
      tooltip: {
        backgroundColor: '#18181b', // zinc-900
        titleColor: '#ffffff',
        bodyColor: '#d4d4d8',
        borderColor: '#3f3f46', // zinc-700
        borderWidth: 1,
        displayColors: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }


  return (
    <GraphWrapper>
    <ChartSide>
      <Doughnut data={data} options={options} />
      <StyledText>
        <p>보유 자산</p>
        <p>비중 (%)</p>
      </StyledText>
    </ChartSide>

    <LegendSide>
      {sortedCoinsRates.map((coin: any, i: number) => (
        <LegendItem key={coin.market}>
          <div className="dot" style={{ backgroundColor: data.datasets[0].backgroundColor[i] }} />
          <span className="name">{coin.market}</span>
          <span>{coin.value}%</span>
        </LegendItem>
      ))}
    </LegendSide>
  </GraphWrapper>
  );
}

export default AssetCircleGraph;
