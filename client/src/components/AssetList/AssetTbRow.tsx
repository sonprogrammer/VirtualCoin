import { memo } from "react"
import { StyledDivider, StyledTbBox, StyledTbContent, StyledTbContentSmBox, StyledTbTitle, StyledTbTitleCoinName, StyledTbTitleContents } from "./style"
import { useRecoilValue } from "recoil"
import { selectedCoinPrice } from "../../context/selectedCoinPrice"
import { AssetCoinsData } from "../../hooks/useCalculateAsset"


interface AssetTbRowProps {
    coin: AssetCoinsData
}

function AssetTbRowInner({coin}: AssetTbRowProps) {

    const coinInfoMap = useRecoilValue(selectedCoinPrice([coin.market]))
    const coinInfo = coinInfoMap[coin.market]
    const currentPrice = coinInfo?.trade_price ?? 0

    const coinValue = currentPrice * coin.amount
    const totalBuyPrice = coin.avgBuyPrice * coin.amount
    const profitLoss = coinValue - (coin.avgBuyPrice * coin.amount)
    const profitRate = coin.avgBuyPrice ? ((profitLoss / (coin.avgBuyPrice * coin.amount)) * 100)  : 0
    const isPlus = profitLoss >= 0

    const market = coin.market.split('-')[1]
    return (
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
                            className={`${isPlus ? 'text-red-500' : 'text-blue-700'}`}
                        >
                            {isPlus  && '+'}
                            {Math.round(Number(profitLoss)).toLocaleString()} KRW
                        </span>
                    </p>
                    <p>
                        <span>수익률</span>
                        <span
                            className={`${isPlus ? 'text-red-500' : 'text-blue-700'}`}
                        >
                            {isPlus && '+'}
                            {profitRate.toFixed(2)}%</span>
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
                        <span>{Math.round(Number(coinValue)).toLocaleString()}</span>
                        <span> KRW</span>
                    </p>
                    <p>평가금액</p>
                </StyledTbContentSmBox>
                <StyledTbContentSmBox>
                    <p>
                        <span>{totalBuyPrice.toLocaleString()}</span>
                        <span> KRW</span>
                    </p>
                    <p>매수금액</p>
                </StyledTbContentSmBox>

            </StyledTbContent>
        </StyledTbBox>
    )
}

export const AssetTbRow = memo(AssetTbRowInner)