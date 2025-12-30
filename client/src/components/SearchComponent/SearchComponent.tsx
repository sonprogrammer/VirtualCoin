
import { useEffect, useRef, useState } from 'react'
import { StyledBox, StyledCloseBtn, StyledCoinBox, StyledCoinContainer, StyledCoinContent, StyledCoinNameAndImg, StyledCoinNumber, StyledContainer, StyledInput, StyledNoResult } from './style'
import useGetCoins from '../../hooks/useGetCoins'
import { useNavigate } from 'react-router-dom'
import usePostRecentCoin from '../../hooks/usePostRecentCoin'
import { useRecoilState } from 'recoil'
import { CoinPrice } from '../../context/CoinPrice'

interface SearchComponentProps {
  handleSearchModalClose: () => void
}

const SearchComponent = ({ handleSearchModalClose }: SearchComponentProps) => {
  const [coins, setCoins] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [prices] = useRecoilState(CoinPrice);

  const navigate = useNavigate()
  const { mutate: addRecentCoin } = usePostRecentCoin();


  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus()
    }
  },[])

  const handleCoinClick = (coinId: string) => {
    navigate(`/coin/${coinId}`)
    addRecentCoin(coinId)
    handleSearchModalClose()
  }

  
  
  const { data: coinData, isLoading, error } = useGetCoins()

  useEffect(() => {
    if (coinData && prices) {
      const sortedCoins = [...coinData].sort((a, b) => {
        const tradeVolumeA = prices[a.market]?.acc_price || 0;
        const tradeVolumeB = prices[b.market]?.acc_price || 0;
        return tradeVolumeB - tradeVolumeA;
      });
      setCoins(sortedCoins)
    }
  }, [prices])

  const filteredCoins = coins.filter(coin => (
    coin.korean_name.toLowerCase().includes(searchQuery.toLowerCase())
  ))


  if (isLoading) return (
    <StyledContainer>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-red-500 rounded-full animate-spin" />
        <p className="text-zinc-400 text-sm animate-pulse">코인 목록을 가져오는 중...</p>
      </div>
    </StyledContainer>
  )
  if (error) return <div>Error occurred: {error.message}</div>

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }


  return (
    <StyledContainer onClick={handleSearchModalClose}>
      <StyledBox onClick={e => e.stopPropagation()}>
        <StyledInput>
          <input
            type="text"
            placeholder='검색할 코인명을 입력하세요'
            value={searchQuery}
            onChange={handleSearchInputChange}
            ref={inputRef}
          />
          <StyledCloseBtn onClick={handleSearchModalClose}>✕</StyledCloseBtn>
        </StyledInput>

        <StyledCoinContainer>
          {filteredCoins.length === 0 ? (
            <StyledNoResult>
              <p className="mt-2 text-sm font-medium">검색 결과가 없습니다.</p>
            </StyledNoResult>
          ) : (
            <>
              <h1>
                <span>코인 TOP 20</span>
                <span>거래대금 순</span>
              </h1>
              <div className="flex flex-col">
                {filteredCoins.slice(0, 20).map((coin, i) => {
                  const coinMarket = prices[coin.market]
                  const coinUnit = coin.market.split('-')[1]
                  const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`
                  
                  if (!coinMarket) return null;

                  return (
                    <StyledCoinBox key={coin.market} onClick={() => handleCoinClick(coin.market)}>
                      <div className='flex items-center gap-2'>
                        <StyledCoinNumber>{String(i + 1).padStart(2, '0')}</StyledCoinNumber>
                        <StyledCoinNameAndImg>
                          <img src={coinLogo} alt="로고" width='28' height='28' />
                          <span>{coin.korean_name}</span>
                        </StyledCoinNameAndImg>
                      </div>
                      <StyledCoinContent>
                        <p>{coinMarket.trade_price?.toLocaleString()} <span className="text-[10px] text-zinc-500 font-normal">KRW</span></p>
                        <p className={coinMarket.change_rate > 0 ? 'text-red-500' : 'text-blue-500'}>
                          {coinMarket.change_rate > 0 && '+'}{(coinMarket.change_rate * 100).toFixed(2)}%
                        </p>
                      </StyledCoinContent>
                    </StyledCoinBox>
                  )
                })}
              </div>
            </>
          )}
        </StyledCoinContainer>
      </StyledBox>
    </StyledContainer>
  )
}

export default SearchComponent
