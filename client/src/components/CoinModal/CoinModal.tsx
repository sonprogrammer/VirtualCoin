
import { useRef } from 'react';
import usePostRecentCoin from '../../hooks/usePostRecentCoin';
import { CoinRowForInterRecent } from '../CoinRowForInterRecent';
import { StyledContainer, StyledContent, StyledContentTitle, StyledModal } from './style';
import { useNavigate } from 'react-router-dom';


interface CoinModalProps {
  title: string;
  coinData: {
    coinKoreanName: string;
    coinMarket: string;
  }[];
  onClose: () => void;
}
const CoinModal = ({ title, coinData, onClose }: CoinModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  // console.log('coinData fro mmodal', coinData)

  const navigate = useNavigate()

  const { mutate: addRecentCoin } = usePostRecentCoin();

  const handleCoinClick = (coinId: string) => {
    navigate(`/coin/${coinId}`)
    onClose()
    addRecentCoin(coinId)
  }



  return (
    <StyledContainer className='modal-overlay' onClick={onClose}>
      <StyledModal ref={modalRef} onClick={e => e.stopPropagation()}>
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
          {coinData?.map((a) => (
            <CoinRowForInterRecent 
              key={a.coinMarket}
              coin={a}
              onClick={() => handleCoinClick(a.coinMarket)}
            />
          ))}
        </StyledContent>

      </StyledModal>
    </StyledContainer>
  )
}

export default CoinModal
