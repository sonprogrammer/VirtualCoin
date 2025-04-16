

import useCalculateAsset from '../../hooks/useCalculateAsset';
import useGetAssetData from '../../hooks/useGetAssetData';

import { StyledContainer, StyledImage, StyledTable, StyledTableBody, StyledTableHead, StyledTableTr } from './style';


const AssetList = () => {
    const {data: assetData} = useGetAssetData()
    const calculatedData = useCalculateAsset(assetData)
    if (!assetData) {
        return <div>Loading...</div>; 
    }
    
    
    const coins = assetData?.coins.filter((c:any) => c.amount !== 0) || []
    
    const {coinDetailPrice} =  calculatedData || {};

    return (
        <StyledContainer>
            <StyledTable>
                <StyledTableHead>
                    <th>보유자산</th>
                    <th>보유수량</th>
                    <th>매수평군가</th>
                    <th>평가금액</th>
                    <th>평가손익(%)</th>
                </StyledTableHead>
                <StyledTableBody>
                    {coins.map((coin: any, i: number) => {
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
                                <td>{coin.avgBuyPrice?.toLocaleString()}</td>
                                <td>{coinDetailPrice[i].coinValue?.toLocaleString()}</td>
                                <td>
                                    <div>
                                        <p
                                            className={`${Number(coinDetailPrice[i].profitLoss) < 0 ? 'text-blue-600' : 'text-red-500'}`}
                                        >
                                            {Number(coinDetailPrice[i].profitRate) > 0 && '+'}
                                            {coinDetailPrice[i].profitRate}%</p>
                                        <p
                                            className={`${Number(coinDetailPrice[i].profitLoss) < 0 ? 'text-blue-600' : 'text-red-500'}`}
                                        >{coinDetailPrice[i].profitLoss?.toLocaleString()}KRW</p>
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
