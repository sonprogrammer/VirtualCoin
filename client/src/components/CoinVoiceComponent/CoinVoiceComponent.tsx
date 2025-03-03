import { useParams } from "react-router-dom";
import useGetOrderBook from "../../hooks/useGetOrderBook";
import { QuantityBar, StyledAskBox, StyledAskContent, StyledBidBox, StyledBidContent, StyledContainer } from "./style";

const CoinVoiceComponent = () => {
  const { coinId } = useParams<{ coinId: string }>();

  const { orderBook } = useGetOrderBook(coinId || "");



  if (!orderBook) {
    return <div>Loading...</div>;
  }

  const totalBidQuantity = orderBook.bids.reduce((acc, bid) => acc + Number(bid.quantity), 0);
  const totalAskQuantity = orderBook.asks.reduce((acc, ask) => acc + Number(ask.quantity), 0);

  return (
    <StyledContainer>

      <StyledAskBox>
        {orderBook.asks.reverse().map((ask, index) => (
          <StyledAskContent key={index}>
            <p>
              {Number(ask.quantity).toFixed(3)}
              <QuantityBar quantity={Number(ask.quantity)} totalQuantity={totalAskQuantity} type='ask'/>
            </p>
            <p className="border-x-[1px]">
              {ask.price.toLocaleString()}
            </p>
            <p>
              {ask.changeRate !== null ? `${ask.changeRate.toFixed(2)} %` : "error"}
            </p>

          </StyledAskContent>
        ))}
      </StyledAskBox>
      <div className="border-2"></div>

      <StyledBidBox>
        {orderBook.bids.map((bid, index) => (
          <StyledBidContent key={index}>
            <p>
              {Number(bid.quantity).toFixed(3)}
              <QuantityBar quantity={Number(bid.quantity)} totalQuantity={totalBidQuantity} type='bid'/>
            </p>
            <p className="border-x-[1px]">
              {bid.price.toLocaleString()}
            </p>
            <p>
              {/* //!호가당 전일대비 퍼센트 */}
              {bid.changeRate !== null ? `${bid.changeRate.toFixed(2)} %` : "error"}
            </p>


          </StyledBidContent>
        ))}
      </StyledBidBox>


    </StyledContainer>

  );
};

export default CoinVoiceComponent;
