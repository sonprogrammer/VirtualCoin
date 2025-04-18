const express = require('express');
const { getAssetData, postBuyCoins, postSellCoins, getAllAssetData } = require('../Controller/assetController');


const assetRouter = express.Router()

assetRouter.get('/all-user/:userId', getAllAssetData)
assetRouter.get('/', getAssetData)
assetRouter.post('/:coinId/buy', postBuyCoins)
assetRouter.post('/:coinId/sell', postSellCoins)
module.exports = assetRouter