const Hold = require("../Models/holdingModel");



// *미체결 내용 전체 가져오기
const getHold = async(req, res)=> {
    try {
        
    } catch (error) {
        
    }
}

// *매수 예약
const postBuyReserve = async (req, res) => {
  try {
    const { amount, avgBuyPrice, name, userId } = req.body;
    const market = req.params.coinId;

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
    });
    console.log("reserver", reserve);

    await reserve.save();
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
      });

      await reserve.save();
      return res.status(200).json({message: 'success', reserve})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { postBuyReserve, postSellReserve };
