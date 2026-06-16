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
    const priceData = useRecoilValue(selectedCoinPrice(coin.coinMarket))

    if (!priceData) {
        return (
            <StyledCoin>
                <p>{coin.coinKoreanName}</p>
                <img src='/dotLoading.gif' alt='loading' className="h-10" />
            </StyledCoin>
        )
    }

    const isPositive = Number(priceData.change_rate) > 0
    const colorClass = isPositive ? 'text-red-500' : 'text-blue-600'


    return (
        <StyledCoin onClick={onClick}>
            <p>{coin.coinKoreanName}</p>
            <p className={colorClass}>{Number(priceData.trade_price).toLocaleString()}</p>
            <p className={colorClass}>
                {isPositive ? '+' : ''}{(Number(priceData.change_rate) * 100).toLocaleString()}%
            </p>
        </StyledCoin>
    )
}

export const CoinRowForInterRecent = memo(CoinRowForInterRecentInner)