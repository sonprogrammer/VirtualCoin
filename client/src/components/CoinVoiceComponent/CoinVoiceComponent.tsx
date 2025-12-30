import { useMemo } from "react";
import  { OrderBook } from "../../hooks/useGetOrderBook";
import { QuantityBar, StyledAskBox, StyledAskContent, StyledBidBox, StyledBidContent, StyledContainer, StyledRight } from "./style";
import Skeleton from '@mui/material/Skeleton';


interface CoinVoiceComponentProps {
  orderBook: OrderBook | null;  
}
const CoinVoiceComponent = ({orderBook} : CoinVoiceComponentProps) => {


  if (!orderBook) {
    return (
      <div className='h-full p-2 bg-zinc-950'>
        <Skeleton variant="rectangular" height='100%' sx={{ bgcolor: '#18181b', borderRadius: '8px' }}/>
      </div>
    )
  }

  const totalBidQuantity = useMemo(() => 
    orderBook.bids.reduce((acc, bid) => acc + Number(bid.quantity), 0), 
    [orderBook.bids]
  );
  const totalAskQuantity = useMemo(() => 
    orderBook.asks.reduce((acc, ask) => acc + Number(ask.quantity), 0), 
    [orderBook.asks]
  );

  return (
    <StyledContainer>

      <StyledAskBox>
        {orderBook.asks.slice().reverse().map((ask) => (
          <StyledAskContent key={ask.price}>
            <p>
              {Number(Number(ask.quantity).toFixed(3)).toLocaleString()}
              <QuantityBar quantity={Number(ask.quantity)} totalQuantity={totalAskQuantity} type='ask'/>
            </p>
            <StyledRight>
              <p>{ask.price?.toLocaleString()}</p>
              <p>{ask.changeRate !== null ? `${ask.changeRate.toFixed(2)}%` : ""}</p>
            </StyledRight>
          </StyledAskContent>
        ))}
      </StyledAskBox>


      <div className="h-[1px] bg-zinc-800 my-1"></div>


      <StyledBidBox>
        {orderBook.bids.map((bid) => (
          <StyledBidContent key={bid.price}>
            <p>
              {Number(Number(bid.quantity).toFixed(3)).toLocaleString()}
              <QuantityBar quantity={Number(bid.quantity)} totalQuantity={totalBidQuantity} type='bid'/>
            </p>
            <StyledRight>
              <p>{bid.price?.toLocaleString()}</p>
              <p>{bid.changeRate !== null ? `${bid.changeRate.toFixed(2)}%` : ""}</p>
            </StyledRight>
          </StyledBidContent>
        ))}
      </StyledBidBox>
    </StyledContainer>

  )
}

export default CoinVoiceComponent;
