const Asset = require("../Models/assetModel");
const User = require("../Models/userModel");


//*자산 정보 가져오기
const getAssetData = async(req, res) => {
    try {
        const { userId } = req.query
        // console.log('userId', userId)

        if(!userId){
            return res.status(400).json({error: 'there is no userId'})
        }

        let asset = await Asset.findOne({userId}).populate('userId',  'name')
        // console.log('assetdsfd', asset)
        if(!asset){
            asset = new Asset({
                userId: userId,
                // TODO 밑에 삭제 해야함
                coins: [{
                    market: 'KRW-BTC',
                    name: '비트코인',
                    amount: 1.5,
                    avgBuyPrice: 10000000
            }]
            })
            await asset.save()
            // console.log('new asset created', asset)
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
        const { name, amount, avgBuyPrice, userId, cash} = req.body
        const market = req.params.coinId

console.log('cash', cash)

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

        await userAsset.save()
        return res.status(200).json({message: 'success', userAsset})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'internal server eerorororr'})
    }
}

module.exports = { getAssetData,postBuyCoins}