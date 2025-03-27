const Hold = require("../Models/holdingModel");
const Asset = require("../Models/assetModel")
const { startWebSocket, prices } = require("../utils/getTradePrice");


// *실시간 가격체크 후 체결
const checkOrder = async(userId, market, avgTradePrice, amount, type) => {
  try {
    const currentPrice = prices[market]?.trade_price
    if(!currentPrice){
      console.log('there is no currentprice')
      return

    }

    // *매수 - 지정가가 현재가격보다 같거나 클 때
    if(type === 'BUY' && currentPrice <= avgTradePrice){
      const holdingOrders = await Hold.findOne({userId})

      if(!holdingOrders){
        console.log('there is no orders')
        return
  
      }

      const orderIndex = holdingOrders.orders.findIndex(order => order.coinMarket === market && order.status === 'PENDING')

      if(orderIndex === -1){
        console.log('there is no holding orders')
        return
  
      }

      const order = holdingOrders.orders[orderIndex]

      const userAsset = await Asset.findOne({userId})

      // *만약 자산에 코인이 하나도 없고 미체결된 상태로 있었을 시
      if(!userAsset){
        const newAsset = new Asset({
          userId,
          coins: [{
            market: market,
            name: order.coinKName,
            amount: amount,
            // TODO여기 한번 더 생각해보기 매도일 때는 이게 들어가면 안됌
            avgBuyPrice: avgTradePrice,
          }]
        })
        await newAsset.save()
        console.log('생성자산 매수시 발생 newAsset', newAsset)
      }else{
        const coinIndex = userAsset.coins.findIndex(c => c.market === market)
        if(coinIndex === -1){
          userAsset.coins.push({
            market: market,
            name: order.coinKName,
            amount: amount,
            avgBuyPrice: avgTradePrice
          })
        }else{
            userAsset.coins[coinIndex].amount +=amount
        }
        await userAsset.save()
        console.log('생성자산 매수시 발생 userAsset', userAsset)
      }

      holdingOrders.orders[orderIndex].status = 'COMPLETED'
      await holdingOrders.save()
      
      
      console.log('매수 자산 실시간', newAsset)
    }
    // *매도 - 지정가가 현재가격보다 같거나 작을 때
    if(type ==='SELL' && currentPrice >= avgTradePrice){
      const holdingOrders = await Hold.findOne({userId})

      if(!holdingOrders){
        console.log('there is no orders')
        return
      }

      const orderIndex = holdingOrders.orders.findIndex(order => order.coinMarket === market && order.status === 'PENDING')

      if(orderIndex === -1){
        console.log('there is no holdingOrder')
        return
      }

      const order = holdingOrders.orders[orderIndex]
      const userAsset = await Asset.findOne({userId})

      if(!userAsset){
        const newAsset = new Asset({
          userId,
          coins: [{
            market: market,
            name: order.coinKName,
            amount: amount,
            // TODO여기 한번 더 생각해보기 매도일 때는 이게 들어가면 안됌
            avgBuyPrice: avgTradePrice,
          }]
        })
        await newAsset.save()
      }

      const coinIndex = userAsset.coins.findIndex(c => c.market === market)

      if(coinIndex === -1){
        console.log('there is no more coins')
        return
      }

      userAsset.coins[coinIndex].amount -= amount

      const getCash = amount * avgTradePrice
      userAsset.cash += getCash
      await userAsset.save()

      holdingOrders.orders[orderIndex].status = 'COMPLETED'
      await holdingOrders.save()
      console.log('매도 완료')
    }
  } catch (error) {
    console.log(error)
  }
}

// *미체결 내용 전체 가져오기
const getHoldingOrder = async(req, res)=> {
    try {
        const { userId } = req.params

        if(!userId){
          return res.status(404).json({message: 'userId is required'})
        }
        const holdingOrders = await Hold.findOne({userId})

        if (!holdingOrders) {
          return res.status(404).json({ error: "No orders found" });
        }

        const filteredOrders = holdingOrders.orders.filter(order => order.status === "PENDING");

        return res.status(200).json({message: 'success', filteredOrders})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'internal server error'})
    }
}

// *매수 예약
const postBuyReserve = async (req, res) => {
  try {
    const { amount, avgBuyPrice, name, userId } = req.body;
    const market = req.params.coinId;
    const avgTradePrice = avgBuyPrice

    if (!userId) {
      return res.status(400).json({ error: "there is no userId" });
    }

    let reserve = await Hold.findOne({ userId }).populate("userId");

    if (!reserve) {
      reserve = new Hold({ userId, orders: [] });
    }

    reserve.orders.push({
      userId,
      coinMarket: market,
      coinKName: name,
      type: "BUY",
      orderQuantity: amount,
      orderPrice: avgBuyPrice,
      orderTime: new Date(),
      status: "PENDING"
    });
    console.log("reserver", reserve);

    await reserve.save();

    await checkOrder(userId, market, avgTradePrice, amount, "BUY" )
    
    return res.status(200).json({ message: "successful", reserve });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

// *매도 예약
const postSellReserve = async (req, res) => {
  try {
    const { name, amount, avgSellPrice, userId } = req.body;
    const market = req.params.coinId;

    const avgTradePrice = avgSellPrice

    if (!userId) {
      return res.status(400).json({ error: "there is no userId" });
    }
    let reserve = await Hold.findOne({ userId }).populate('userId')
    
    if (!reserve) {
      reserve = new Hold({ userId, orders: [] });
    }

    reserve.orders.push({
        userId,
        coinMarket: market,
        coinKName: name,
        type: "SELL",
        orderQuantity: amount,
        orderPrice: avgSellPrice,
        orderTime: new Date(),
        status: "PENDING"
      });

      await reserve.save();

      await checkOrder(userId, market, avgTradePrice, amount, "SELL");

      return res.status(200).json({message: 'success', reserve})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { postBuyReserve, postSellReserve, getHoldingOrder };
