import { memo } from "react"
import { useRecoilValue } from "recoil";
import { selectedCoinPrice } from "../../context/selectedCoinPrice";
import { StyledCoin } from "./style";

interface CoinRowForInterRecentProps {
    coin: {
        coinKoreanName: string;
        coinMarket: string;
    };
    coinLogo: string
    onClick: () => void
}

function CoinRowForInterRecentInner({ coin, onClick, coinLogo }: CoinRowForInterRecentProps) {
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
            <div className="flex items-center gap-2">
                <img src={coinLogo} alt={coin.coinKoreanName} className="w-7 h-7 rounded-full" />
                <p>
                    {coin.coinKoreanName}
                </p>
            </div>
            <p className={colorClass}>{Number(currentPrice).toLocaleString()}</p>
            <p className={colorClass}>
                {isPositive ? '+' : ''}{(Number(changeRate) * 100).toLocaleString()}%
            </p>
        </StyledCoin>
    )
}

export const CoinRowForInterRecent = memo(CoinRowForInterRecentInner)