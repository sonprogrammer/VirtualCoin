
import { StyledCLogoImg, StyledCoinInfo, StyledConInfoWrapper, StyledContainer, StyledLeftInfo, StyledLikedBtn, StyledPrices, StyledRateNumbers, StyledRates, StyledTitlePrice } from "./style";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import useLikeToggle from "../../hooks/useLikeToggle";
import useGetLikedCoins from "../../hooks/useGetLikeCoins";
import Skeleton from "@mui/material/Skeleton";
import { useSelectedCoinInfo } from "../../hooks/useGetSelectedCoinInfo";
import { selectedCoinPrice } from "../../context/selectedCoinPrice";


interface DetailCoinInfoComponentProps {
    coinEName: string;

}



const DetailCoinInfoComponent = ({ coinEName }: DetailCoinInfoComponentProps) => {
    //* 코인 이름
    const { coinData, isLoading } = useSelectedCoinInfo(coinEName)
    const { likeToggle } = useLikeToggle();
    const { likedCoins = [] } = useGetLikedCoins()
    const coinInfoMap = useRecoilValue(selectedCoinPrice([coinEName]))
    // * 현재 페이지 코인 가격 데이터
    const coinInfo = coinInfoMap[coinEName]

    // 좋아요 등록, 취소 
    const handleLikedCoin = () => {
        likeToggle(coinEName)
    }

    const isStar = likedCoins.includes(coinEName)

    if (isLoading || !coinData) {
        return <Skeleton variant="rectangular" width='100%' height={100} sx={{ bgcolor: '#18181b' }} />;
    }

    if (!coinInfo) {
    return (
        <div className="w-full flex items-center justify-center p-4">
            <Skeleton variant="text" width="60%" height={30} sx={{ bgcolor: '#27272a' }} />
        </div>
    );
}

    const isPlus = coinInfo.change_rate > 0
    const coinUnit = coinEName?.split('-')[1];
    const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`;
    const coinName = coinData?.korean_name
    return (
        <StyledContainer>
            <StyledLeftInfo>
                <StyledCLogoImg>
                    <img src={coinLogo} alt="Logo" />
                    <div>
                        <p>{coinName}</p>
                        <span className="text-[10px] text-zinc-500 font-mono">{coinEName}</span>
                    </div>
                    <StyledLikedBtn onClick={handleLikedCoin}>
                        <FontAwesomeIcon
                            icon={isStar ? fullStar : faStar}
                            className={isStar ? "!text-yellow-400" : "!text-zinc-600"}
                            size="lg"
                        />
                    </StyledLikedBtn>
                </StyledCLogoImg>

                <StyledTitlePrice>
                    <p className={isPlus ? '!text-red-500' : '!text-blue-500'}>
                        {coinInfo?.trade_price?.toLocaleString() ?? 0}
                        <span className="text-xs ml-1 font-normal opacity-70">KRW</span>
                    </p>
                    <p className={isPlus ? '!text-red-500' : '!text-blue-500'}>
                        <span>{isPlus ? '+' : ''}{(coinInfo?.change_rate * 100).toFixed(2)?? 0}%</span>
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
