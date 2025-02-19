
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
import { coins, total_bid } from './mockupData'
import {  StyledContainer, StyledText } from './style';


// 필요한 컴포넌트들을 등록
ChartJS.register(ArcElement, Tooltip, Legend, Colors);


function AssetCircleGraph() {

  const coinsRates = coins.map(coin => {
    return {
      market: coin.market,
      value: Number(((coin.price / total_bid) * 100).toFixed(2))
    }
  })

  const sortedCoinsRates = [...coinsRates].sort((a, b) => b.value - a.value)


  const generatedColors = (count: number) => {
    const colors = []
    const hueStep = 360 / count

    for (let i = 0; i < count; i++) {
      const hue = i * hueStep
      colors.push(`hsl${hue}, 70%, 50%`)
    }
    return colors
  }

  const data = {
    labels: sortedCoinsRates.map(coin => coin.market),
    datasets: [
      {
        data: sortedCoinsRates.map(coin => coin.value),
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
              data.labels?.map((label, index) => ({
                text: `${label}: ${dataset.data[index]}%`,
                fillStyle: colors?.[index] || '#000000',
                hidden: false,
                index: index,
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
