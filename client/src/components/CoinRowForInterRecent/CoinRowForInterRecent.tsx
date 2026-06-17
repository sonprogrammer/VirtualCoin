import { memo } from "react"
import { useRecoilValue } from "recoil";
import { selectedCoinPrice } from "../../context/selectedCoinPrice";
import { StyledCoin } from "./style";

interface CoinRowForInterRecentProps {
    coin: {
        coinKoreanName: string;
        coinMarket: string;
    };
    onClick: () => void
}

function CoinRowForInterRecentInner({ coin, onClick }: CoinRowForInterRecentProps) {
    const coinPriceInfoMap = useRecoilValue(selectedCoinPrice([coin.coinMarket]))
    const priceInfo = coinPriceInfoMap[coin.coinMarket]
    const currentPrice = priceInfo?.trade_price ?? 0
    const changeRate = priceInfo?.change_rate
    if (!priceInfo) {
        return (
            <StyledCoin>
                <p>{coin.coinKoreanName}</p>
                <img src='/dotLoading.gif' alt='loading' className="h-10" />
            </StyledCoin>
        )
    }

    const isPositive = Number(changeRate) > 0
    const colorClass = isPositive ? 'text-red-500' : 'text-blue-600'


    return (
        <StyledCoin onClick={onClick}>
            <p>{coin.coinKoreanName}</p>
            <p className={colorClass}>{Number(currentPrice).toLocaleString()}</p>
            <p className={colorClass}>
                {isPositive ? '+' : ''}{(Number(changeRate) * 100).toLocaleString()}%
            </p>
        </StyledCoin>
    )
}

export const CoinRowForInterRecent = memo(CoinRowForInterRecentInner)