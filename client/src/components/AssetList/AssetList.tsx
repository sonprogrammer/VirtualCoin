
import { useRecoilState, useRecoilValue } from 'recoil';
import useCalculateAsset from '../../hooks/useCalculateAsset';
import useGetAssetData from '../../hooks/useGetAssetData';

import { StyledContainer, StyledImage, StyledTable, StyledTableBody, StyledTableHead, StyledTableTr } from './style';
import { CoinPrice } from '../../context/CoinPrice';



// ! 컴퓨터 버전
const AssetList = () => {
    const {data: assetData} = useGetAssetData()
    const calculatedData = useCalculateAsset(assetData)
    if (!assetData) {
        return <div>Loading...</div>; 
      }
    
    
    const coins = assetData?.coins || []
    // console.log('asse', calculatedData)

    const {
        // * 평가손익
        totalProfitLoss,
        // *수익률
        totalProfitRate,
        // *코인 현재가격
        currentCoinPrice

    } =  calculatedData || {};

    return (
        <StyledContainer className='listContainer'>
            <StyledTable>
                <StyledTableHead>
                    <th>보유자산</th>
                    <th>보유수량</th>
                    <th>매수평군가</th>
                    <th>평가금액</th>
                    <th>평가손익(%)</th>
                </StyledTableHead>
                <StyledTableBody>
                    {coins.map((coin: any) => {
                        const market = coin.market.split('-')[1]
                        const coinImage = `https://static.upbit.com/logos/${market}.png`

                        return (

                            <StyledTableTr key={coin.id}>
                                <td>
                                    <StyledImage>
                                        <img src={coinImage} alt="코인이미지" />
                                        <p>{coin.name}</p>
                                    </StyledImage>
                                </td>
                                <td>{coin.amount}</td>
                                <td>{coin.avgBuyPrice.toLocaleString()}</td>
                                <td>{currentCoinPrice?.toLocaleString()}</td>
                                <td>
                                    <div>
                                        <p
                                            className={`${Number(totalProfitRate) < 0 ? 'text-blue-600' : 'text-red-500'}`}
                                        >
                                            {Number(totalProfitRate) > 0 && '+'}
                                            {totalProfitRate}%</p>
                                        <p
                                            className={`${Number(totalProfitRate) < 0 ? 'text-blue-600' : 'text-red-500'}`}
                                        >{totalProfitLoss?.toLocaleString()}KRW</p>
                                    </div>
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
