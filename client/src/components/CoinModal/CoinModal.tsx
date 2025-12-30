
import usePostRecentCoin from '../../hooks/usePostRecentCoin';
import { StyledCoin, StyledContainer, StyledContent, StyledContentTitle, StyledModal } from './style';
import { useNavigate } from 'react-router-dom';

type Coin = {
  coinKoreanName: string;
  coinMarket: string;
  price: {
    trade_price: string;
    change_rate: string;
  }
};

interface CoinModalProps {
  title: string;
  coinData: Coin[];
  onClickOutside: () => void;
}
const CoinModal = ({ title, coinData, onClickOutside }: CoinModalProps) => {

  const navigate = useNavigate()

  const { mutate: addRecentCoin } = usePostRecentCoin();

  const handleCoinClick = (coinId: string) => {
    navigate(`/coin/${coinId}`)
    onClickOutside()
    addRecentCoin(coinId)
  }



  return (
    <StyledContainer onClick={onClickOutside}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <p>{title}</p>
        <StyledContentTitle>
          <p>코인</p>
          <p>현재가</p>
          <p>전일대비</p>
        </StyledContentTitle>


        {coinData?.length === 0 &&
          <div className='h-full flex flex-col w-full items-center justify-center'>
            <img src="/emptyCoin.gif" alt="코인" />
          </div>
        }
        <StyledContent>
          {coinData?.map((a, index) => (
            <StyledCoin key={index} onClick={() => handleCoinClick(a.coinMarket)}>
              <p>{a.coinKoreanName || "Loading..."}</p>

              <p className={`${a.price && Number(a.price.change_rate) > 0 ? 'text-red-500' : 'text-blue-600'}`}>
                {a.price?.trade_price ? Number(a.price.trade_price).toLocaleString() : <img src='/dotLoading.gif' alt='loadingIcon' className=' h-10'/>}
              </p>

              <p className={`${a.price && Number(a.price.change_rate) > 0 ? 'text-red-500' : 'text-blue-600'}`}>
                {a.price ? `${Number(a.price.change_rate) > 0 ? '+' : ''}${(Number(a.price.change_rate) * 100).toLocaleString()}%` : <img src='/dotLoading.gif' alt='loadingIcon' className='h-10'/>}
              </p>
            </StyledCoin>
          ))}
        </StyledContent>

      </StyledModal>
    </StyledContainer>
  )
}

export default CoinModal
