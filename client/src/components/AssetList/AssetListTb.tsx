
import { StyledDivider, StyledTbBox, StyledTbContainer, StyledTbContent, StyledTbContentSmBox, StyledTbTitle, StyledTbTitleCoinName, StyledTbTitleContents } from './style'
import coinData from './mockupData'


// !테블릿버전
const AssetListTb = () => {
  return (
    <StyledTbContainer className='tbcontainer'>   
        {
            coinData.map(coin => {
                const evaluatPrice = coin.currentPrice * coin.quantity
                const buyPrice = coin.averageBuyPrice * coin.quantity
                const profitLoss = evaluatPrice - buyPrice
                const profitRate = ((profitLoss / buyPrice) * 100).toFixed(2)

                return(

            
      <StyledTbBox className='tbBox'>

        <StyledTbTitle>
            <StyledTbTitleCoinName>
                <p>{coin.coinName}</p>
                <p>({coin.coinImage.split("/").pop()?.split(".")[0]})</p>
            </StyledTbTitleCoinName>
            <StyledTbTitleContents>
                <p> 
                    <span>평가손익</span>
                    {/* //TODO 하락, 상승에 따른 색상변화 */}
                    <span
                        className={`${profitLoss > 0 ? 'text-red-500' : 'text-blue-700'}`}
                    >
                        {profitLoss > 0 && '+'}
                        {profitLoss.toLocaleString()} KRW
                        </span>
                </p>
                <p>
                    <span>수익률</span>
                    <span
                        className={`${profitLoss > 0 ? 'text-red-500' : 'text-blue-700'}`}
                    >
                        {profitLoss > 0 && '+'}
                        {profitRate.toLocaleString()}%</span>
                </p>

            </StyledTbTitleContents>
        </StyledTbTitle>

        <StyledDivider></StyledDivider>

        <StyledTbContent>
            <StyledTbContentSmBox>
                <p>
                    <span>{coin.quantity.toLocaleString()}</span>
                    <span> {coin.coinImage.split("/").pop()?.split(".")[0]}</span>
                </p>
                <p>보유수량</p>
            </StyledTbContentSmBox>
            <StyledTbContentSmBox>
                <p>
                    <span>{coin.averageBuyPrice.toLocaleString()}</span>
                    <span> KRW</span>
                </p>
                <p>매수평균가</p>
            </StyledTbContentSmBox>
            <StyledTbContentSmBox>
                <p>
                    <span>{evaluatPrice.toLocaleString()}</span>
                    <span> KRW</span>
                </p>
                <p>평가금액</p>
            </StyledTbContentSmBox>
            <StyledTbContentSmBox>
                <p>
                    <span>{buyPrice.toLocaleString()}</span>
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
