import { mockupData as data } from './mockupdata'
import { StyledBottomBox, StyledBottomBoxContents, StyledBottomContentBox, StyledContainer, StyledDivider, StyledRestOfMoney, StyledTopBox, StyledTopBoxContents } from './style'


const AssetResultTextComponent = () => {
    
    return (
        <StyledContainer className='Assettext'>
            <StyledTopBox>
                <StyledTopBoxContents>
                    <h2>보유 KRW</h2>
                    <h1>{data.krw.toLocaleString()}</h1>
                    <p>KRW</p>
                </StyledTopBoxContents>
                <StyledTopBoxContents>
                    <h2>총 보유자산</h2>
                    <h1>{data.totalAssets.toLocaleString()}</h1>
                    <p>KRW</p>
                </StyledTopBoxContents>
            </StyledTopBox>

            <StyledDivider></StyledDivider>

            <StyledBottomBox>
                <StyledBottomBoxContents>
                    <h2>총 매수</h2>
                    <StyledBottomContentBox>
                        <h1>{data.totalBuyAmount.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                <StyledBottomBoxContents>
                    <h2>평가손익</h2>
                    <StyledBottomContentBox>
                        <h1
                            className={`${data.totalProfitLoss > 0 ? 'text-red-500' : 'text-blue-600'}`}
                        >{data.totalProfitLoss.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                
                <StyledBottomBoxContents>
                    <h2>총 평가</h2>
                    <StyledBottomContentBox>
                        <h1>{data.totalEvaluationAmount.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                <StyledBottomBoxContents>
                    <h2>수익률</h2>
                    <StyledBottomContentBox>
                        <h1
                            className={`${data.totalProfitLoss > 0 ? 'text-red-500' : 'text-blue-600'}`}
                        >{data.totalProfitPercentage}</h1>
                        <h3>%</h3>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>

                <StyledRestOfMoney>
                    <h2>주문가능</h2>
                    <StyledBottomContentBox>
                        <h1>{data.totalProfitLoss.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledRestOfMoney>
            </StyledBottomBox>

        </StyledContainer>
    )
}

export default AssetResultTextComponent
