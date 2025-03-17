import { useRecoilValue } from 'recoil'
import { StyledBottomBox, StyledBottomBoxContents, StyledBottomContentBox, StyledContainer, StyledDivider, StyledRestOfMoney, StyledTopBox, StyledTopBoxContents } from './style'
import useGetAssetData from '../../hooks/useGetAssetData'
import { calculatedAssetState } from '../../context/calculatedAssetState'


const AssetResultTextComponent = () => {
    const assetData = useGetAssetData()
    const caclulatedAsset = useRecoilValue(calculatedAssetState)
    console.log('calcul', calculatedAssetState)
    // console.log('asse', assetData)

    const {
        totalAssets,
        totalValuationAmount,
        availableOrder,
        totalProfitLoss,
        totalProfitRate,
        totalBuy,
    } = assetData.caculatedAsset || {};

    // // *총 자산
    // const totalAssets = assetData.caculatedAsset?.totalAssets
    // // *총 평가
    // const totalValuationAmount = assetData.caculatedAsset?.totalValuationAmount
    // // * 평가손익
    // const totalProfitLoss = assetData.caculatedAsset?.totalProfitLoss
    // // *주문 가능 = 보유 현금
    // const availableOrder = assetData.caculatedAsset?.availableOrder
    // // *수익률
    // const totalProfitRate = assetData.caculatedAsset?.totalProfitRate
    // // *총 매수
    // const totalBuy = assetData.caculatedAsset?.totalBuy
    return (
        <StyledContainer className='Assettext'>
            <StyledTopBox>
                <StyledTopBoxContents>
                    <h2>보유 KRW</h2>
                    <h1>{availableOrder?.toLocaleString()}</h1>
                    <p>KRW</p>
                </StyledTopBoxContents>
                <StyledTopBoxContents>
                    <h2>총 보유자산</h2>
                    <h1>{totalAssets?.toLocaleString()}</h1>
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
                            className={`${totalProfitLoss && totalProfitLoss > 0 ? 'text-red-500' : 'text-blue-600'}`}
                        >{totalProfitLoss?.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                
                <StyledBottomBoxContents>
                    <h2>총 평가</h2>
                    <StyledBottomContentBox>
                        <h1>{totalValuationAmount?.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>
                <StyledBottomBoxContents>
                    <h2>수익률</h2>
                    <StyledBottomContentBox>
                        <h1
                            className={`${totalProfitLoss && totalProfitLoss > 0 ? 'text-red-500' : 'text-blue-600'}`}
                        >{totalProfitRate}</h1>
                        <h3>%</h3>
                    </StyledBottomContentBox>
                </StyledBottomBoxContents>

                <StyledRestOfMoney>
                    <h2>주문가능</h2>
                    <StyledBottomContentBox>
                        <h1>{availableOrder?.toLocaleString()}</h1>
                        <p>KRW</p>
                    </StyledBottomContentBox>
                </StyledRestOfMoney>
            </StyledBottomBox>

        </StyledContainer>
    )
}

export default AssetResultTextComponent
