
import { useEffect, useRef, useState } from 'react'
import { StyledBox, StyledCloseBtn, StyledCoin, StyledCoinBox, StyledCoinContainer, StyledCoinContent, StyledCoinNameAndImg, StyledCoinNumber, StyledContainer, StyledInput, StyledNoResult } from './style'
import useGetCoins from '../../hooks/useGetCoins'
import useWebSocket from '../../hooks/useWebSocket'
import { useNavigate } from 'react-router-dom'
import usePostRecentCoin from '../../hooks/usePostRecentCoin'

interface SearchComponentProps {
  handleSearchModalClose: () => void
}

const SearchComponent = ({ handleSearchModalClose }: SearchComponentProps) => {
  const [coins, setCoins] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

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
  const coinInfo = useWebSocket(coinData)

  useEffect(() => {
    if (coinData && coinInfo) {
      const sortedCoins = [...coinData].sort((a, b) => {
        const tradeVolumeA = coinInfo[a.market]?.acc_price || 0;
        const tradeVolumeB = coinInfo[b.market]?.acc_price || 0;
        return tradeVolumeB - tradeVolumeA;
      });
      setCoins(sortedCoins)
    }
  }, [coinInfo])

  const filteredCoins = coins.filter(coin => (
    coin.korean_name.toLowerCase().includes(searchQuery.toLowerCase())
  ))


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred: {error.message}</div>

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }


  return (
    <StyledContainer onClick={handleSearchModalClose}>

      <StyledBox className='box' onClick={e => e.stopPropagation()}>
        <StyledInput>
          <input
            type="text"
            placeholder='코인을 검색하세요'
            value={searchQuery}
            onChange={handleSearchInputChange}
            ref={inputRef}
            />
            <StyledCloseBtn onClick={handleSearchModalClose}>X</StyledCloseBtn>
        </StyledInput>

        {filteredCoins.length === 0 &&
          <StyledNoResult>
            🚨there is no coins🚨
          </StyledNoResult>
        }

        <StyledCoinContainer>
          <h1>
            <span>코인 TOP 20</span>
            <span>(거래대금 순)</span>
          </h1>
          <StyledCoin>
            {(filteredCoins.length > 0 ? filteredCoins : coins).slice(0, 20).map((coin: any, i) => {
              const coinMarket = coinInfo[coin.market]
              const coinUnit = coin.market.split('-')[1]
              const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`
              if (!coinMarket) {
                return null;
              }
              return (
                <>
                  <StyledCoinBox onClick={() => handleCoinClick(coin.market)}>
                    <div className='flex gap-2'>
                      <StyledCoinNumber>
                        {i + 1}
                      </StyledCoinNumber>
                      <StyledCoinNameAndImg>
                        <img src={coinLogo} alt="로고" width='30' height='30' />
                        {coin.korean_name}
                      </StyledCoinNameAndImg>
                    </div>
                    <StyledCoinContent>
                      <p>{coinMarket.trade_price?.toLocaleString()}</p>
                      <p
                        className={`${coinMarket.change_rate > 0 ? 'text-red-500' : 'text-blue-500'} `}
                      >{coinMarket.change_rate > 0 && '+'}{coinMarket.change_rate?.toLocaleString()}</p>
                    </StyledCoinContent>

                  </StyledCoinBox>
                </>
              )
            })}
          </StyledCoin>

        </StyledCoinContainer>
      </StyledBox>
    </StyledContainer>
  )
}

export default SearchComponent
