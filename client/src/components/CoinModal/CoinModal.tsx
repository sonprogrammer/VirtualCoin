
import { useEffect } from 'react';
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


  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const navigate = useNavigate()

  const { mutate: addRecentCoin } = usePostRecentCoin();

  const handleCoinClick = (coinId: string) => {
    navigate(`/coin/${coinId}`)
    onClose()
    addRecentCoin(coinId)
  }



  return (
    <StyledContainer className='modal-overlay' onClick={onClose}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <div className="flex w-full items-center justify-between border-b border-zinc-800 px-5 py-4">

          <h2 className="text-base font-bold text-zinc-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-xl text-zinc-500 transition-colors hover:text-white"
          >
            ×
          </button>
        </div>
        <StyledContentTitle>
          <p>코인</p>
          <p>현재가</p>
          <p>전일대비</p>
        </StyledContentTitle>


        {!coinData || coinData?.length === 0 &&
          <div className='h-full flex flex-col w-full items-center justify-center'>
            <img src="/emptyCoin.gif" alt="코인" />
            <p className="mt-3 text-sm text-zinc-500">
              코인 내역이 없습니다.
            </p>
          </div>
        }
        <StyledContent>
          {coinData?.map((a) => {
            const coinUnit = a.coinMarket.split('-')[1]
            const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`
            return (
            <CoinRowForInterRecent
              key={a.coinMarket}
              coin={a}
              coinLogo={coinLogo}
              onClick={() => handleCoinClick(a.coinMarket)}
            />
          )})}
        </StyledContent>

      </StyledModal>
    </StyledContainer>
  )
}

export default CoinModal
