import { memo } from "react"
import { AssetCoinsData } from "../../hooks/useCalculateAsset"
import { useRecoilValue } from "recoil"
import { selectedCoinPrice } from "../../context/selectedCoinPrice"
import { ProfitBox, StyledImage, StyledTableTr } from "./style"

interface AssetRowProps {
    coin: AssetCoinsData
}

function AssetRowInner({ coin }: AssetRowProps) {
    // * 내가 구독한 코인들이 실시간 데이터 나옴(즉, 내가 구매한 코인들 데이터 가 하나씩 객체형태로 나옴 한번에 배열로 나온는게 아니라)
    const priceInfoMap = useRecoilValue(selectedCoinPrice([coin.market]))
    // * 내가 구독한 코인중 현재 해당 코인의 마켓 데이터만 가져옴
    const priceInfo = priceInfoMap[coin.market]
    const currentPrice = priceInfo?.trade_price ?? 0

    const coinValue = currentPrice * coin.amount
    const profitLoss = coinValue - (coin.avgBuyPrice * coin.amount)
    const profitRate = coin.avgBuyPrice ? ((profitLoss / (coin.avgBuyPrice * coin.amount)) * 100) : 0
    const isPlus = profitLoss >= 0

    const market = coin.market.split('-')[1]
    const coinImage = `https://static.upbit.com/logos/${market}.png`
    return (
        <StyledTableTr>
            <td>
                <StyledImage>
                    <img src={coinImage} alt={market} />
                    <p>{coin.name}</p>
                </StyledImage>
            </td>
            <td>{coin.amount?.toLocaleString()}</td>
            <td className="text-zinc-400">{Number(coin.avgBuyPrice)?.toLocaleString()}</td>
            <td className="font-bold">{Math.round(coinValue).toLocaleString()}</td>
            <td>
                <ProfitBox>
                    <p className={isPlus ? '!text-red-500' : '!text-sky-400'}>
                        {isPlus && '+'}{profitRate.toFixed(2)}%
                    </p>
                    <p className={isPlus ? '!text-red-500' : '!text-sky-400'}>
                        {Math.round(profitLoss).toLocaleString()}
                    </p>
                </ProfitBox>
            </td>
        </StyledTableTr>
    )
}

export const AssetRow = memo(AssetRowInner)