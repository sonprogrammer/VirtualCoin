const Hold = require("../Models/holdingModel");
const Asset = require("../Models/assetModel")
const { startWebSocket, getCurrentPrice, startAllCoinsWebSocket } = require("../utils/getTradePrice");
const Transaction = require("../Models/transactionModel");


// *실시간 가격체크 후 체결
const checkOrder = async(userId, market, avgTradePrice, amount, type) => {
  try {

    startWebSocket(market)

    let retryCount = 0
    let currentPrice
    
    while(retryCount < 10){
      currentPrice = getCurrentPrice(market)
      if(currentPrice){
        break
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      retryCount++
    }

    if(!currentPrice) {
      console.log('can not get currentPrice')
      return
    }
    

    console.log('currentprice from checkOrder', currentPrice)
    if(!currentPrice){
      console.log('there is no currentprice')
      return

    }

    // *매수 - 지정가가 현재가격보다 같거나 클 때
    if(type === 'BUY' && currentPrice <= avgTradePrice){
      await processOrder(userId, market, avgTradePrice, amount, type, currentPrice)
    }
    //   const holdingOrders = await Hold.findOne({userId})

    //   if(!holdingOrders){
    //     console.log('there is no orders')
    //     return
  
    //   }

    //   const orderIndex = holdingOrders.orders.findIndex(order => order.coinMarket === market && order.status === 'PENDING')

    //   if(orderIndex === -1){
    //     console.log('there is no holding orders')
    //     return
  
    //   }

    //   const order = holdingOrders.orders[orderIndex]

    //   const userAsset = await Asset.findOne({userId})

    //   // *만약 자산에 코인이 하나도 없고 미체결된 상태로 있었을 시
    //   if(!userAsset){
    //     const newAsset = new Asset({
    //       userId,
    //       coins: [{
    //         market: market,
    //         name: order.coinKName,
    //         amount: amount,
    //         // TODO여기 한번 더 생각해보기 매도일 때는 이게 들어가면 안됌
    //         avgBuyPrice: avgTradePrice,
    //       }]
    //     })
    //     await newAsset.save()
    //     console.log('생성자산 매수시 발생 newAsset', newAsset)
    //   }else{
    //     const coinIndex = userAsset.coins.findIndex(c => c.market === market)
    //     if(coinIndex === -1){
    //       userAsset.coins.push({
    //         market: market,
    //         name: order.coinKName,
    //         amount: amount,
    //         avgBuyPrice: avgTradePrice
    //       })
    //     }else{
    //         userAsset.coins[coinIndex].amount +=amount
    //     }
    //     await userAsset.save()
    //     console.log('생성자산 매수시 발생 userAsset', userAsset)
    //   }

    //   holdingOrders.orders[orderIndex].status = 'COMPLETED'
    //   await holdingOrders.save()
      
      
    //   console.log('매수 자산 실시간', newAsset)
    // }
    // *매도 - 지정가가 현재가격보다 같거나 작을 때
    if(type ==='SELL' && currentPrice >= avgTradePrice){
      await processOrder(userId, market, avgTradePrice, amount, type, currentPrice)
    }
    //   const holdingOrders = await Hold.findOne({userId})

    //   if(!holdingOrders){
    //     console.log('there is no orders')
    //     return
    //   }

    //   const orderIndex = holdingOrders.orders.findIndex(order => order.coinMarket === market && order.status === 'PENDING')

    //   if(orderIndex === -1){
    //     console.log('there is no holdingOrder')
    //     return
    //   }

    //   const order = holdingOrders.orders[orderIndex]
    //   const userAsset = await Asset.findOne({userId})

    //   if(!userAsset){
    //     const newAsset = new Asset({
    //       userId,
    //       coins: [{
    //         market: market,
    //         name: order.coinKName,
    //         amount: amount,
    //         // TODO여기 한번 더 생각해보기 매도일 때는 이게 들어가면 안됌
    //         avgBuyPrice: avgTradePrice,
    //       }]
    //     })
    //     await newAsset.save()
    //   }

    //   const coinIndex = userAsset.coins.findIndex(c => c.market === market)

    //   if(coinIndex === -1){
    //     console.log('there is no more coins')
    //     return
    //   }

    //   userAsset.coins[coinIndex].amount -= amount

    //   const getCash = amount * avgTradePrice
    //   userAsset.cash += getCash
    //   await userAsset.save()

    //   holdingOrders.orders[orderIndex].status = 'COMPLETED'
    //   await holdingOrders.save()
    //   console.log('매도 완료')
    // }
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

// * 주문처리
const processOrder = async(userId, market, orderPrice, amount, type, currentPrice) => {
  try {
    const holdingOrders = await Hold.findOne({userId})
    if(!holdingOrders){
      console.log('there is no holding coins')
      return 
    }

    const orderIndex = holdingOrders.orders.findIndex(order => order.coinMarket === market && order.status === 'PENDING' && order.type === type)

    if(orderIndex === -1){
      console.log('can not find order')
      return 
    }

    const order = holdingOrders.orders[orderIndex]
    let userAsset = await Asset.findOne({userId})

    if(type === 'BUY'){
      if(!userAsset){
        userAsset = new Asset({
          userId,
          coins: [{
            market,
            name: order.coinKName,
            amount,
            avgBuyPrice: orderPrice,
          }]
        })
        await userAsset.save()
        console.log("newAsset", userAsset)
      }else{
        const coinIndex = userAsset.coins.findIndex(c => c.market === market)
        if(coinIndex === -1){
          userAsset.coins.push({
            market,
            name: order.coinKName,
            amount,
            avgBuyPrice: orderPrice
          })
        }else{
          userAsset.coins[coinIndex].amount += amount
        }
        await userAsset.save()
        console.log('buy userAsset', userAsset)
      }
    }else if(type === 'SELL'){
      if(!userAsset){
        console.log('there is no coins')
        return 
      }
      const coinIndex = userAsset.coins.findIndex(c => c.market === market)
      if(coinIndex === -1){
        console.log('there is no coin for selling')
        return
      }
      //*코인량 감소
      userAsset.coins[coinIndex].amount -= amount
      //*현금 추가
      const getCash = amount * orderPrice
      userAsset.cash = (userAsset.cash || 0) + getCash

      await userAsset.save()
      console.log('selling success', userAsset.cash)
    }

    // *거래내역 모델에 추가
    const transaction = await Transaction.findOne({userId})
    const newTransaction = {
      market,
      type,
      amount,
      price: orderPrice,
      kName: order.coinKName,
      orderTime: order.orderTime,
      completedTime: new Date()
    }

    if(!transaction){
      const newTransactionDC = new Transaction({
        userId,
        coins: [newTransaction]
      })
      await newTransactionDC.save()
    }else{
      transaction.coins.unshift(newTransaction)
      await transaction.save()
    }

    holdingOrders.orders[orderIndex].status = 'COMPLETED'
    holdingOrders.orders[orderIndex].completedTime = new Date().toISOString()
    await holdingOrders.save()
    console.log('success order', holdingOrders)

  } catch (error) {
    console.error('errorro', error)
  }
}


// * 미체결 코인 실시간 검사
const realTimeCheckOrder = async() => {
  try {
    const allOrders = await Hold.find()
    if(!allOrders) {
      console.log('there is no ordres')
      return
    }

    const allPendingCoins = []
    for(const holdingOrders of allOrders){
      const pedingOrders = holdingOrders.orders.filter(order => order.status === 'PENDING')
      for(const order of pedingOrders){
        if(!allPendingCoins.includes(order.coinMarket)){
          allPendingCoins.push(order.coinMarket)
        }
      }
    }

    if(allPendingCoins.length === 0){
      console.log('there is no coins ')
      return
    }

    console.log('pending coins ', allPendingCoins)

    await startAllCoinsWebSocket(allPendingCoins)

    const checkInterval = setInterval(async() => {
      try {
        const orders = await Hold.find()
        if(!orders){
          console.log('there is no orders')
          clearInterval(checkInterval)
          realTimeCheckOrder()
          return
        }

        let pedingOrderExists = false

        for(const holdingOrders of orders){
          for(const order of holdingOrders.orders){
            if(order.status === 'PENDING'){
              pedingOrderExists = true
              const currentPrice = getCurrentPrice(order.coinMarket)

              if(currentPrice){
                if ((order.type === 'BUY' && currentPrice <= order.orderPrice) || 
                    (order.type === 'SELL' && currentPrice >= order.orderPrice)) {
                      await processOrder(
                        holdingOrders.userId,
                        order.coinMarket,
                        order.orderPrice,
                        order.orderQuantity,
                        order.type,
                        currentPrice
                      )
                    }
              }
            }
          }
        }

        if(!pedingOrderExists){
          clearInterval(checkInterval)
          realTimeCheckOrder()
        }
      } catch (error) {
        console.error('realtime error', error)
      }
    }, 5000)
  } catch (error) {
    console.error(error)
    setTimeout(realTimeCheckOrder, 5000)
  }
}
realTimeCheckOrder()
// 

// *매수 예약
const postBuyReserve = async (req, res) => {
  try {
    const { amount, avgBuyPrice, name, userId } = req.body;
    const market = req.params.coinId;
    const avgTradePrice = avgBuyPrice
    const totalCost = amount * avgBuyPrice

    if (!userId) {
      return res.status(400).json({ error: "there is no userId" });
    }

    const userAsset = await Asset.findOne({userId})

    if(!userAsset){
      return res.status(404).json({message:'user Not found'})
    }

    if(userAsset.cash < totalCost){
      return res.status(404).json({message: 'no money'})
    }

    userAsset.cash -= totalCost
    await userAsset.save()

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

