
import { StyledDivider, StyledTbBox, StyledTbContainer, StyledTbContent, StyledTbContentSmBox, StyledTbTitle, StyledTbTitleCoinName, StyledTbTitleContents } from './style'
import coinData from './mockupData'
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
            coins.map((coin:any, i: number) => {
                const market = coin.market.split('-')[1]
                const totalBuy = coin.avgBuyPrice * coin.amount
                return(

            
      <StyledTbBox className='tbBox'>

        <StyledTbTitle>
            <StyledTbTitleCoinName>
                <p>{coin.name}</p>
                <p>{market}</p>
            </StyledTbTitleCoinName>
            <StyledTbTitleContents>
                <p> 
                    <span>평가손익</span>
                    {/* //TODO 하락, 상승에 따른 색상변화 */}
                    <span
                        className={`${coinDetailPrice[i].profitLoss > 0 ? 'text-red-500' : 'text-blue-700'}`}
                    >
                        {coinDetailPrice[i].profitLoss > 0 && '+'}
                        {coinDetailPrice[i].profitLoss.toLocaleString()} KRW
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
                    <span>{coin.amount.toLocaleString()}</span>
                    {/* <span> {coin.coinImage.split("/").pop()?.split(".")[0]}</span> */}
                </p>
                <p>보유수량</p>
            </StyledTbContentSmBox>
            <StyledTbContentSmBox>
                <p>
                    <span>{coin.avgBuyPrice.toLocaleString()}</span>
                    <span> KRW</span>
                </p>
                <p>매수평균가</p>
            </StyledTbContentSmBox>
            <StyledTbContentSmBox>
                <p>
                    <span>{coinDetailPrice[i].coinValue?.toLocaleString()}</span>
                    <span> KRW</span>
                </p>
                <p>평가금액</p>
            </StyledTbContentSmBox>
            <StyledTbContentSmBox>
                <p>
                    {/* <span>{buyPrice.toLocaleString()}</span> */}
                    {/* 보유수량 * 매수평균가 */}
                    <span>{totalBuy.toLocaleString()}</span>
                    <span> KRW</span>
                </p>
                <p>매수금액</p>
            </StyledTbContentSmBox>

        </StyledTbContent>
      </StyledTbBox>
          )
        })
    }
    </StyledTbContainer>
  )
}

export default AssetListTb
