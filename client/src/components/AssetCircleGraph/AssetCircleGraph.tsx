
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  TooltipItem,
  Chart,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// import { coins, total_bid } from './mockupData'
import {  StyledContainer, StyledText } from './style';
import useGetAssetData from '../../hooks/useGetAssetData';


// 필요한 컴포넌트들을 등록
ChartJS.register(ArcElement, Tooltip, Legend, Colors);


function AssetCircleGraph() {
  const assetData = useGetAssetData()
  
  if (!assetData || !assetData.data) {
    return <div>Loading...</div>; 
  }
  
  const coins = assetData.data.coins || []

  // *코인별 평가금액
  const coinValue = coins.map((coin: any) => ({
    market: coin.market,
    value: coin.amount * coin.avgBuyPrice
  }))

  const totalCoinValue = coinValue.reduce((sum: number, coin:any) => sum+coin.value, 0)

  const coinsRate = totalCoinValue > 0 ? coinValue.map((coin: any) => ({
    market: coin.market,
    value: Number(((coin.value / totalCoinValue) * 100).toFixed(2))
  })) : []

  

  const sortedCoinsRates = coinsRate.sort((a:any, b: any) => b.value - a.value)



  // const generatedColors = (count: number) => {
  //   const colors = []
  //   const hueStep = 360 / count

  //   for (let i = 0; i < count; i++) {
  //     const hue = i * hueStep
  //     colors.push(`hsl${hue}, 70%, 50%`)
  //   }
  //   return colors
  // }

  const generatedColors = (count: number) => {
    return Array.from({length: count}, (_, i) => `hsl(${(i* 40) % 360}, 70%, 50%)`)
  }

  const data = coins.length === 0 ? {
    labels: ['No Coin'],
    datasets: [
      {
        data: [100],
        backgroundColor: ['#d3d3d3'],
        hoverOffset: 3
      }
    ]
  } : {
    labels: sortedCoinsRates.map((coin:any) => coin.market),
    datasets: [
    {
      data: sortedCoinsRates.map((coin: any) => coin.value),
      backgroundColor: generatedColors(sortedCoinsRates.length),
      hoverOffset: 3
    }
  ]
}

  const options = {
    plugins: {
      colors: {
        forceOverride: true,
      },
      legend: {
        position: 'left' as const,
        onClick: () => { },
        labels: {
          generateLabels: (chart: ChartJS) => {
            const data = chart.data;
            const dataset = data.datasets[0];
            const colors = dataset.backgroundColor as string[];

            return (
              data.labels?.map((label, i) => ({
                text: `${label}: ${dataset.data[i]}%`,
                fillStyle: colors?.[i] || '#000000',
                hidden: false,
                index: i,
              })) || []
            );
          },
        },
      },
      tooltip: {
        position: 'nearest' as const,
        callbacks: {
          label: function (context: TooltipItem<'doughnut'>) {
            const label = context.label;
            const value = context.raw;
            return ` ${label}: ${value}%`;
          },
        },
        yAlign: 'top' as const,
        xAlign: 'center' as const,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };


  return (
    <StyledContainer className='graph있는쪽'>

        <Doughnut data={data} options={options} className='w-full h-full ' />
        <StyledText>
          <p>보유 비중</p>
          <p>(%)</p>
        </StyledText>


    </StyledContainer>
  );
}

export default AssetCircleGraph;
