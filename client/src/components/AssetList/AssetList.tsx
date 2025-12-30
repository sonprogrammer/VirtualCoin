

import Skeleton from '@mui/material/Skeleton';
import useCalculateAsset from '../../hooks/useCalculateAsset';
import useGetAssetData from '../../hooks/useGetAssetData';

import { ProfitBox, StyledContainer, StyledImage, StyledTable, StyledTableBody, StyledTableHead, StyledTableTr } from './style';


const AssetList = () => {
    const { data: assetData } = useGetAssetData()
    const calculatedData = useCalculateAsset(assetData)
    if (!assetData) {
        return (
            <div className='w-full space-y-2'>
                <Skeleton variant='rectangular' height={50} sx={{ bgcolor: '#18181b' }} />
                <Skeleton variant='rectangular' height={200} sx={{ bgcolor: '#18181b' }} />
            </div>
        );
    }


    const coins = assetData?.coins.filter((c: any) => c.amount !== 0) || []

    const { coinDetailPrice } = calculatedData || {};

    return (
        <StyledContainer>
            <StyledTable>
                <StyledTableHead>
                    <tr>
                    <th className='w-[25%]'>보유자산</th>
                        <th>보유수량</th>
                        <th>매수평균가</th>
                        <th>평가금액</th>
                        <th className='w-[20%]'>평가손익(%)</th>
                    </tr>
                </StyledTableHead>
                <StyledTableBody>
                    {coins.map((coin: any, i: number) => {
                        const market = coin.market.split('-')[1]
                        const coinImage = `https://static.upbit.com/logos/${market}.png`
                        const detail = coinDetailPrice?.[i] || {}
                        const isPlus = Number(detail.profitLoss) >= 0
                        return (
<StyledTableTr key={coin.id || i}>
                                <td>
                                    <StyledImage>
                                        <img src={coinImage} alt={market} />
                                        <p>{coin.name}</p>
                                    </StyledImage>
                                </td>
                                <td>{coin.amount?.toLocaleString()}</td>
                                <td className="text-zinc-400">
                                    {Number(coin.avgBuyPrice)?.toLocaleString()}
                                </td>
                                <td className="font-bold">
                                    {Math.round(Number(detail.coinValue || 0)).toLocaleString()}
                                </td>
                                <td>
                                    <ProfitBox>
                                        <p className={isPlus ? '!text-red-500' : '!text-sky-400'}>
                                            {isPlus && '+'}
                                            {detail.profitRate}%
                                        </p>
                                        <p className={isPlus ? '!text-red-500' : '!text-sky-400'}>
                                            {Math.round(Number(detail.profitLoss || 0)).toLocaleString()}
                                        </p>
                                    </ProfitBox>
                                </td>
                            </StyledTableTr>
                        )
                    })}
                </StyledTableBody>
            </StyledTable>
        </StyledContainer>
    )
}

export default AssetList
