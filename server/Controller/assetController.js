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
        console.log('asset', asset)
        if(!asset){
            asset = new Asset({
                userId: userId,
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