import { useEffect, useState } from "react"
import { PriceData } from "../../hooks/useWebSocket"
import useGetCoins from "../../hooks/useGetCoins"
import { StyledCLogoImg, StyledCoinInfo, StyledContainer, StyledPrices, StyledRateNumbers, StyledRates } from "./style";

interface CoinName {
    market: string;
    korean_name: string;
    english_name: string;
}


interface DetailCoinInfoComponentProps {
    coinInfo: PriceData | undefined
    coinId: string | undefined
}


const DetailCoinInfoComponent = ({ coinInfo, coinId }: DetailCoinInfoComponentProps) => {
    const [coinName, setCoinName] = useState<string>('')

    const { data: coinData, isLoading, error } = useGetCoins()


    useEffect(() => {
        if (coinData && coinId) {
            const thisCoin = coinData.find((c: CoinName) => coinId === c.market);
            if (thisCoin) {
                setCoinName(thisCoin.korean_name);
            }
        }
    }, [coinData, coinId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const coinUnit = coinId?.split('-')[1]
    const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`

    return (
        <StyledContainer>

            <StyledCLogoImg>
                <img src={coinLogo} alt="CoinLogo" />
                <p>{coinName}</p>
            </StyledCLogoImg>


            <StyledCoinInfo className="정보">

                <StyledPrices className="고가저가">
                    <p>
                        <span>고가</span>
                        <span className="text-red-500">{coinInfo?.high_price.toLocaleString()}</span>
                    </p>
                    <p>
                        <span>저가</span>
                        <span className="text-blue-600">{coinInfo?.low_price.toLocaleString()}</span>
                    </p>
                </StyledPrices>

                <StyledRates className="거래량, 거래대금">
                    <div>
                        <span>거래량(24H)</span>
                        <StyledRateNumbers>
                        <span>{Number(coinInfo?.trade_volume).toLocaleString()}</span>
                            <span>{coinUnit}</span>
                        </StyledRateNumbers>
                    </div>
                    <div>
                        <span>거래대금(24H)</span>
                        <StyledRateNumbers>
                            <span>{Math.floor(coinInfo?.acc_price as number).toLocaleString()}</span>
                            <span>KRW</span>
                        </StyledRateNumbers>
                    </div>
                </StyledRates>

            </StyledCoinInfo>

        </StyledContainer>
    )
}

export default DetailCoinInfoComponent
