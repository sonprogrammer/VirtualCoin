const Asset = require("../Models/assetModel");
const User = require("../Models/userModel");


const getAssetData = async(req, res) => {
    try {
        const { userId } = req.query
        console.log('userId', userId)

        if(!userId){
            return res.status(400).json({error: 'there is no userId'})
        }

        let asset = await Asset.findOne({userId}).populate('userId',  'name')
        console.log('assetdsfd', asset)
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
            console.log('new asset created', asset)
        }
        return res.status(200).json(asset)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'internal server error'})
    }
}


module.exports = { getAssetData}