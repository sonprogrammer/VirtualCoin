
import { StyledBottomBox, StyledBottomBoxContents, StyledBottomContentBox, StyledContainer, StyledDivider, StyledRestOfMoney, StyledTopBox, StyledTopBoxContents } from './style'
import useGetAssetData from '../../hooks/useGetAssetData'
import useCalculateAsset from '../../hooks/useCalculateAsset'
import Skeleton from '@mui/material/Skeleton'


const AssetResultTextComponent = () => {
    const {data} = useGetAssetData()
    const calculatedData = useCalculateAsset(data)

    const {
        // *총 자산
        totalAssets,
        // *총 평가
        totalValuationAmount,
        // *주문 가능 = 보유 현금
        availableOrder,
        // * 평가손익
        totalProfitLoss,
        // *수익률
        totalProfitRate,
        // *총 매수
        totalBuy,
    } =  calculatedData || {};

   
    return (
        <StyledContainer>
            <StyledTopBox>
                <StyledTopBoxContents>
                    <h2>보유 KRW</h2>
                    <h1>{availableOrder?.toLocaleString()}</h1>
                    <p>KRW</p>
                </StyledTopBoxContents>
                <StyledTopBoxContents>
                    <h2>총 보유자산</h2>
                    <h1>{Math.round(Number(totalAssets))?.toLocaleString()}</h1>
                    <p>KRW</p>
                </StyledTopBoxContents>
            </StyledTopBox>

            <StyledDivider></StyledDivider>

            <StyledBottomBox>
                <StyledBottomBoxContents>
                    <h2>총 매수</h2>
                    <StyledBottomContentBox>
                        <h1>{totalBuy?.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                <StyledBottomBoxContents>
                    <h2>평가손익</h2>
                    <StyledBottomContentBox>
                        <h1
                            className={`${totalProfitLoss && totalProfitLoss > 0 ? '!text-red-500' : '!text-blue-600'}`}
                        >{Math.round(Number(totalProfitLoss))?.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                
                <StyledBottomBoxContents>
                    <h2>총 평가</h2>
                    <StyledBottomContentBox>
                        <h1>{Math.round(Number(totalValuationAmount))?.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                <StyledBottomBoxContents>
                    <h2>수익률</h2>
                    <StyledBottomContentBox>
                        <h1
                            className={`${totalProfitLoss && totalProfitLoss > 0 ? '!text-red-500' : '!text-blue-600'}`}
                        >{totalProfitRate}</h1>
                        <h3>%</h3>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>

                <StyledRestOfMoney>
                    <h2>주문가능</h2>
                    <StyledBottomContentBox>
                        <h1>{Math.round(Number(availableOrder))?.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledRestOfMoney>
            </StyledBottomBox>

        </StyledContainer>
    )
}

export default AssetResultTextComponent
