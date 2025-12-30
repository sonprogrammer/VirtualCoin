import { useState } from "react"
import { Styledcontainer, StyledNavbar, StyledTradeSection } from "./style"
import { CoinBuyForm, CoinSellForm, CoinBookForm } from './TradeForm';


const TradeComponent = () => {
  


  const [selection, setSelection] = useState<'buy' | 'sell' | 'book'>('buy')

  const handleTabClick = (type: 'buy' | 'sell' | 'book') => {
    setSelection(type)
  }

  return (
    <Styledcontainer>
      <StyledNavbar>
        <p 
          onClick={() => handleTabClick('buy')}
          className={selection === 'buy' ? 'active-buy' : ''}
        >
          매수
        </p>
        <p 
          onClick={() => handleTabClick('sell')}
          className={selection === 'sell' ? 'active-sell' : ''}
        >
          매도
        </p>
        <p 
          onClick={() => handleTabClick('book')}
          className={selection === 'book' ? 'active-book' : ''}
        >
          예약확인
        </p>
      </StyledNavbar>

      <StyledTradeSection>
        {selection === 'buy' && <CoinBuyForm />}
        {selection === 'sell' && <CoinSellForm />}
        {selection === 'book' && <CoinBookForm />}
      </StyledTradeSection>
    </Styledcontainer>
  )
}

export default TradeComponent
