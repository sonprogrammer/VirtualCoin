
import { StyledDivider, StyledNonCoins, StyledTbBox, StyledTbContainer, StyledTbContent, StyledTbContentSmBox, StyledTbTitle, StyledTbTitleCoinName, StyledTbTitleContents } from './style'
import useGetAssetData from '../../hooks/useGetAssetData'
import useCalculateAsset from '../../hooks/useCalculateAsset'


// !테블릿버전
const AssetListTb = () => {
    const {data: assetData} = useGetAssetData()
    const calculatedData = useCalculateAsset(assetData)
    if (!assetData) {
        return <div>Loading...</div>; 
      }
    
    
    const coins = assetData?.coins.filter((c:any) => c.amount !== 0) || []
    
    const {coinDetailPrice} =  calculatedData || {};
  return (
    <StyledTbContainer className='tbcontainer'>   
        {
            coins.length === 0 ? <StyledNonCoins>there is no coins</StyledNonCoins> : (
            coins.map((coin:any, i: number) => {
                const market = coin.market.split('-')[1]
                const totalBuy = coin.avgBuyPrice * coin.amount
                return(

            
      <StyledTbBox>

        <StyledTbTitle>
            <StyledTbTitleCoinName>
                <p>{coin.name}</p>
                <p>{market}</p>
            </StyledTbTitleCoinName>
            <StyledTbTitleContents>
                <p> 
                    <span>평가손익</span>
                    <span
                        className={`${coinDetailPrice[i].profitLoss > 0 ? 'text-red-500' : 'text-blue-700'}`}
                    >
                        {coinDetailPrice[i].profitLoss > 0 && '+'}
                        {Math.round(Number(coinDetailPrice[i].profitLoss)).toLocaleString()} KRW
                        </span>
                </p>
                <p>
                    <span>수익률</span>
                    <span
                        className={`${coinDetailPrice[i].profitLoss > 0 ? 'text-red-500' : 'text-blue-700'}`}
                    >
                        {coinDetailPrice[i].profitLoss > 0 && '+'}
                        {coinDetailPrice[i].profitRate}%</span>
                </p>

            </StyledTbTitleContents>
        </StyledTbTitle>

        <StyledDivider></StyledDivider>

        <StyledTbContent>
            <StyledTbContentSmBox>
                <p>
                    <span>{coin.amount?.toLocaleString()}</span>
                </p>
                <p>보유수량</p>
            </StyledTbContentSmBox>
            <StyledTbContentSmBox>
                <p>
                    <span>{coin.avgBuyPrice?.toLocaleString()}</span>
                    <span> KRW</span>
                </p>
                <p>매수평균가</p>
            </StyledTbContentSmBox>
            <StyledTbContentSmBox>
                <p>
                    <span>{Math.round(Number(coinDetailPrice[i].coinValue)).toLocaleString()}</span>
                    <span> KRW</span>
                </p>
                <p>평가금액</p>
            </StyledTbContentSmBox>
            <StyledTbContentSmBox>
                <p>
                    <span>{totalBuy?.toLocaleString()}</span>
                    <span> KRW</span>
                </p>
                <p>매수금액</p>
            </StyledTbContentSmBox>

        </StyledTbContent>
      </StyledTbBox>
          )
        })
    )}
    </StyledTbContainer>
  )
}

export default AssetListTb
