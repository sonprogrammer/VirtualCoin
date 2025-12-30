import { useEffect, useState } from "react"
import useGetCoins from "../../hooks/useGetCoins"
import { StyledCLogoImg, StyledCoinInfo, StyledConInfoWrapper, StyledContainer, StyledLeftInfo, StyledLikedBtn, StyledPrices, StyledRateNumbers, StyledRates, StyledTitlePrice } from "./style";
import { useRecoilState } from "recoil";
import { coinKName } from "../../context/coinKName";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import useLikeToggle from "../../hooks/useLikeToggle";
import useGetLikedCoins from "../../hooks/useGetLikeCoins";
import Skeleton from "@mui/material/Skeleton";

interface CoinName {
    market: string;
    korean_name: string;
    english_name: string;
}

interface DetailCoinInfoComponentProps {
    coinId: string;
    coinInfo: {
        trade_price: number;
        change_rate: number;
        acc_price: number;
        change_price: number;
        trade_volume: number;
        high_price: number;
        low_price: number;
    } | null
}



const DetailCoinInfoComponent = ({ coinId, coinInfo }: DetailCoinInfoComponentProps) => {
    const [coinName, setCoinName] = useState<string>('');
    const { data: coinData, isLoading, error } = useGetCoins();
    const [kName, setKName] = useRecoilState(coinKName)
    const [liked, setLiked] = useState<string[]>([])
    const { likeToggle } = useLikeToggle();
    const { likedCoins } = useGetLikedCoins()


    useEffect(() => {
        if (coinData && coinId) {
            const thisCoin = coinData.find((c: CoinName) => coinId === c.market);
            if (thisCoin) {
                setCoinName(thisCoin.korean_name);
                setKName(thisCoin.korean_name)
            }
        }
    }, [coinId, coinData]);


    useEffect(() => {
        setLiked(likedCoins || [])
    }, [likedCoins])



    // 좋아요 등록, 취소 -> 
    const handleLikedCoin = () => {
        likeToggle(coinId)
        setLiked((prev) => {
            if (prev.includes(coinId)) {
                return prev.filter(coin => coin !== coinId)
            } else {
                return [...prev, coinId]
            }
        })
    }

    const isStar = () => liked.includes(coinId)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    if (!coinInfo) {
        return <Skeleton variant="rectangular" width='100%' height={100} sx={{ bgcolor: '#18181b' }} />;
    }

    const isPlus = coinInfo.change_rate > 0
    const coinUnit = coinId?.split('-')[1];
    const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`;
    return (
        <StyledContainer>
            <StyledLeftInfo>
                <StyledCLogoImg>
                    <img src={coinLogo} alt="Logo" />
                    <div>
                        <p>{coinName}</p>
                        <span className="text-[10px] text-zinc-500 font-mono">{coinId}</span>
                    </div>
                    <StyledLikedBtn onClick={handleLikedCoin}>
                        <FontAwesomeIcon
                            icon={isStar() ? fullStar : faStar}
                            className={isStar() ? "text-yellow-400" : "text-zinc-600"}
                            size="lg"
                        />
                    </StyledLikedBtn>
                </StyledCLogoImg>

                <StyledTitlePrice>
                    <p className={isPlus ? '!text-red-500' : '!text-sky-400'}>
                        {coinInfo?.trade_price?.toLocaleString()}
                        <span className="text-xs ml-1 font-normal opacity-70">KRW</span>
                    </p>
                    <p className={isPlus ? '!text-red-500' : '!text-sky-400'}>
                        <span>{isPlus ? '+' : ''}{(coinInfo?.change_rate * 100).toFixed(2)}%</span>
                        <span className="ml-2">{isPlus ? '▲' : '▼'} {coinInfo?.change_price?.toLocaleString()}</span>
                    </p>
                </StyledTitlePrice>
            </StyledLeftInfo>

            <StyledConInfoWrapper>
                <StyledCoinInfo>
                    <StyledPrices>
                        <p>
                            <span>고가</span>
                            <span className="!text-red-500">{coinInfo?.high_price?.toLocaleString()}</span>
                        </p>
                        <p>
                            <span>저가</span>
                            <span className="!text-sky-400">{coinInfo?.low_price?.toLocaleString()}</span>
                        </p>
                    </StyledPrices>

                    <StyledRates>
                        <p>
                            <span>거래량(24H)</span>
                            <StyledRateNumbers>
                                {Math.floor(coinInfo?.trade_volume)?.toLocaleString()}
                                <span>{coinUnit}</span>
                            </StyledRateNumbers>
                        </p>
                        <p>
                            <span>거래대금(24H)</span>
                            <StyledRateNumbers>
                                {Math.floor(Number(coinInfo?.acc_price) / 1000000)?.toLocaleString()}
                                <span>백만</span>
                            </StyledRateNumbers>
                        </p>
                    </StyledRates>
                </StyledCoinInfo>
            </StyledConInfoWrapper>
        </StyledContainer>
    )
}

export default DetailCoinInfoComponent
