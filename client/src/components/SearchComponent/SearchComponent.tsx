
import { useEffect, useMemo, useRef, useState } from 'react'
import { StyledBox, StyledCloseBtn, StyledCoinBox, StyledCoinContainer, StyledCoinContent, StyledCoinNameAndImg, StyledCoinNumber, StyledContainer, StyledInput, StyledNoResult } from './style'
import useGetCoins from '../../hooks/useGetCoins'
import { useNavigate } from 'react-router-dom'
import usePostRecentCoin from '../../hooks/usePostRecentCoin'
import { useRecoilValue } from 'recoil'
import { CoinPrice } from '../../context/CoinPrice'

interface SearchComponentProps {
  handleSearchModalClose: () => void
}

const SearchComponent = ({ handleSearchModalClose }: SearchComponentProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const prices = useRecoilValue(CoinPrice)

  const navigate = useNavigate()
  const { mutate: addRecentCoin } = usePostRecentCoin();
  // * 코인 이름 가져오는거임
  const { data: coinData, isLoading, error } = useGetCoins()

  useEffect(() => {
    const searchTime = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    },500)
    return () => clearTimeout(searchTime)
  },[searchQuery])
  
  const sortedAndFilteredCoins = useMemo(() => {
    if(!coinData || !prices) return []
    return [...coinData].sort((a, b) => (prices[b.market].acc_price || 0) - (prices[a.market].acc_price || 0))
                        .filter(coin => coin.korean_name.toLowerCase().includes(debouncedQuery.toLowerCase()))
  },[coinData, prices, debouncedQuery])

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
          {sortedAndFilteredCoins.length === 0 ? (
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
                {sortedAndFilteredCoins.slice(0, 20).map((coin, i) => {
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
