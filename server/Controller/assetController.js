const Asset = require("../Models/assetModel");
const Transaction = require("../Models/transactionModel");



// *전체 유저자산 정보 가져오기 - 랭킹페이지 - User모델에서 이름 가져오고 Asset모델에서 코인데이터, 현금 데이터 가져오면됨
const getAllAssetData = async(req, res) => {
    try {
        const userId = req.params.userId
        let userAsset = await Asset.findOne({userId})
        if(!userAsset){
            userAsset = new Asset({
                userId: userId,
                coins: []
            })
            await userAsset.save()
        }
        
        
        let allUser = await Asset.find({}).populate('userId')


        res.status(200).json({message: 'success', allUser})
    } catch (error) {
        res.status(500).json({message: 'internal server error'})
    }
}


//* 해당 유저의자산 정보 가져오기
const getAssetData = async(req, res) => {
    try {
        const { userId } = req.query

        if(!userId){
            return res.status(400).json({error: 'there is no userId'})
        }

        let asset = await Asset.findOne({userId}).populate('userId',  'name')
        if(!asset){
            asset = new Asset({
                userId: userId,
                coins: []
            })
            await asset.save()
        }
        return res.status(200).json(asset)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'internal server error'})
    }
}

// *매수하기
const postBuyCoins = async(req, res) => {
    try {
        //name은 한국이름
        const { name, amount, avgBuyPrice, userId, cash} = req.body
        const market = req.params.coinId

        const userAsset = await Asset.findOne({userId}).populate('userId')
        if(!userAsset){
            return res.status(404).json({message: 'no asset'})
        }

        const isAlreadyCheck = userAsset.coins.findIndex(c=> c.market === market)

        if(isAlreadyCheck === -1){
            userAsset.coins.push({
                market,
                name,
                amount,
                avgBuyPrice
            })
        }else{
            const isAlreadyIn = userAsset.coins[isAlreadyCheck]
            isAlreadyIn.amount += amount
            isAlreadyIn.avgBuyPrice = (((isAlreadyIn.avgBuyPrice * isAlreadyIn.amount) + (avgBuyPrice * amount)) / (isAlreadyIn.amount + amount))

        }
        const coinPrice = avgBuyPrice * amount
        userAsset.cash = userAsset.cash - coinPrice

        await userAsset.save()

        const transaction = await Transaction.findOne({userId})
        let type = ''
        if(avgBuyPrice) { type = 'BUY'}
        const newTransaction = { 
            market,
            kName: name,
            price: avgBuyPrice,
            type: type,
            amount,
        }

        if(!transaction){
            transaction = new Transaction({ userId, coins: []})
        }

        

        transaction.coins.push({
                market,
                type: "BUY",
                amount,
                price: avgBuyPrice,
                kName: name,
                orderTime: new Date(),
                completedTime: new Date(),
          });
      
          await transaction.save();
        

        return res.status(200).json({message: 'success', userAsset})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'internal server eerorororr'})
    }
}

// *매도 하기
const postSellCoins = async(req,res) =>{
    try {
        
    
    const { name, amount, avgSellPrice, userId} = req.body
    const market = req.params.coinId

    const userAsset = await Asset.findOne({userId}).populate('userId')
    if(!userAsset){
        return res.status(404).json({message: 'user not found'})
    }

    //*코인 보유여부확인
    const coinIndex = userAsset.coins.findIndex(c => c.market === market && c.name === name)
    
    if(coinIndex === -1){
        return res.status(404).json({message: 'you do not have this coin'})
    }
    const coin = userAsset.coins[coinIndex]

    if(coin.amount < amount){
        return res.status(400).json({message: 'not enough coin'})
    }
    const totalSellPrice = avgSellPrice * amount
    coin.amount -= amount

    if(coin.amount === 0){
        userAsset.coins.splice(coinIndex, 1)
    }

    userAsset.cash += totalSellPrice
    await userAsset.save()

    const transaction = await Transaction.findOne({userId})

    if(!transaction){
        transaction = new Transaction({ userId, coins: []})
    }

    transaction.coins.push({
            market,
            type: "SELL",
            amount,
            price: avgSellPrice,
            kName: name,
            orderTime: new Date(),
            completedTime: new Date(),

      });
  
      await transaction.save();
    
    return res.status(200).json({message: 'success', userAsset})
    } catch (error) {
        console.error(error)    
        return res.status(500).json({message: 'internal sever errror'})
    }
}



module.exports = { getAssetData,postBuyCoins, postSellCoins, getAllAssetData}