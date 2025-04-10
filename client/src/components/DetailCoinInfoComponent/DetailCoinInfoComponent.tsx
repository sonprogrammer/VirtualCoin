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

interface CoinName {
    market: string;
    korean_name: string;
    english_name: string;
}

interface DetailCoinInfoComponentProps{
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



const DetailCoinInfoComponent = ({coinId, coinInfo}: DetailCoinInfoComponentProps) => {
    const [coinName, setCoinName] = useState<string>('');
    const { data: coinData, isLoading, error } = useGetCoins();
    const [kName , setKName] = useRecoilState(coinKName)
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

    
    // useEffect(() => {
    //     //만약 좋아요한 코인에 현재 디테일페이지 코인이 있다면 setLiked를 true로 변환
    //     if(likedCoins?.includes(coinId)){
    //         console.log('likedCoins', likedCoins)
    //         setLiked(true)
    //         // console.log(liked)
    //     }else{
    //         setLiked(false)
    //     }
    // },[liked, likedCoins])

    useEffect(() => {
        setLiked(likedCoins || [])
    },[likedCoins])
    

    // 좋아요 등록, 취소 -> 
    const handleLikedCoin = () =>{
        likeToggle(coinId)
        setLiked((prev) => {
            if(prev.includes(coinId)){
                return prev.filter(coin => coin !== coinId)
            }else{
                return [...prev, coinId]
            }
        })
    }

    const isStar = () => liked.includes(coinId)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const coinUnit = coinId?.split('-')[1];
    const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`;
  return (
      <StyledContainer>
      {coinInfo && (
        <>
             <StyledLeftInfo>
                <StyledCLogoImg>
                 <img src={coinLogo} alt="CoinLogo" />
                 <p>{coinName}</p>
                 <StyledLikedBtn>
                {isStar() ? 
                    (<>
                        <FontAwesomeIcon
                            icon={fullStar}
                            onClick={() => handleLikedCoin()}
                            className="text-yellow-400"
                            size="xl"
                        />
                    </>
                  ) : (
                    <>
                        <FontAwesomeIcon
                            icon={faStar}
                            onClick={() => handleLikedCoin()}
                            size="xl"
                        />
                    </>
                  )
                    }
                </StyledLikedBtn>
                </StyledCLogoImg>

                <StyledTitlePrice>
                    <p className={`${coinInfo.change_rate > 0 ? 'text-red-500' : 'text-blue-600'}`}>
                        <span className="font-bold">
                            {coinInfo?.trade_price.toLocaleString()}
                        </span>
                        <span>
                            KRW
                        </span>
                    </p>
                    <p className={`${coinInfo.change_rate > 0 ? 'text-red-500' : 'text-blue-600'}`}>
                        <span>{coinInfo.change_rate > 0 ? '+' : ''}</span>
                        <span>{(coinInfo?.change_rate * 100).toLocaleString()} %</span>
                        <span className="pl-2">{coinInfo.change_rate > 0 ? '+' : ''}</span>
                        <span>{coinInfo?.change_price.toLocaleString()}</span>
                    </p>
                </StyledTitlePrice>
                    
             </StyledLeftInfo>


            <StyledConInfoWrapper>
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
             </StyledConInfoWrapper>
             </>
        )}
        
         </StyledContainer>
  )
}

export default DetailCoinInfoComponent
