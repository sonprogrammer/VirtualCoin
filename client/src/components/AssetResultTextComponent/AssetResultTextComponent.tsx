import { mockupData as data } from './mockupdata'
import { StyledBottomBox, StyledBottomBoxContents, StyledBottomContentBox, StyledContainer, StyledDivider, StyledTopBox, StyledTopBoxContents } from './style'


const AssetResultTextComponent = () => {
    
    return (
        <StyledContainer>
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
                    <h2>총매수금액</h2>
                    <StyledBottomContentBox>
                        <h1>{data.totalBuyAmount.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                <StyledBottomBoxContents>
                    <h2>총평가손익</h2>
                    <StyledBottomContentBox>
                        <h1
                            className={`${data.totalProfitLoss > 0 ? 'text-red-500' : 'text-blue-600'}`}
                        >{data.totalProfitLoss.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                
                <StyledBottomBoxContents>
                    <h2>총평가금액</h2>
                    <StyledBottomContentBox>
                        <h1>{data.totalEvaluationAmount.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                <StyledBottomBoxContents>
                    <h2>총평가수익률</h2>
                    <StyledBottomContentBox>
                        <h1
                            className={`${data.totalProfitLoss > 0 ? 'text-red-500' : 'text-blue-600'}`}
                        >{data.totalProfitPercentage}</h1>
                        <p>%</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
            </StyledBottomBox>

        </StyledContainer>
    )
}

export default AssetResultTextComponent
