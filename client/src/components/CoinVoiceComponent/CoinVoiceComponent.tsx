import { useParams } from "react-router-dom";
import useGetOrderBook from "../../hooks/useGetOrderBook";

const CoinVoiceComponent = () => {
  const { coinId } = useParams<{ coinId: string }>();
    // console.log(coinId);
  const orderbook = useGetOrderBook(coinId || "");
//   console.log('Orderbook', orderbook)
  

if (!orderbook || !orderbook.orderBook || !orderbook.orderBook.bids || !orderbook.orderBook.asks) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Coin ID: {coinId}</h1>
      <h2>호가 갭: {orderbook.orderBook.spreadPercentage !== null ? `${orderbook.orderBook.spreadPercentage.toFixed(2)}%` : "N/A"}</h2>

      <h3>매수</h3>
      {orderbook.orderBook?.bids && orderbook.orderBook.bids.length > 0 ? (
        <ul>
          {orderbook.orderBook.bids.map((bid, index) => (
            <li key={index}>
              Price: {bid.price.toLocaleString()}, Quantity: {bid.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bids available</p>
      )}

      <h3>매도</h3>
      {orderbook.orderBook?.asks && orderbook.orderBook.asks.length > 0 ? (
        <ul>
          {orderbook.orderBook.asks.map((ask, index) => (
            <li key={index}>
              Price: {ask.price.toLocaleString()}, Quantity: {ask.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No asks available</p>
      )}
    </div>
    
  );
};

export default CoinVoiceComponent;
