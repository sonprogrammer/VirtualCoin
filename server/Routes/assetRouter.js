const express = require('express');
const { getAssetData, postBuyCoins, postSellCoins, getAllAssetData } = require('../Controller/assetController');
const authenticateJWT = require('../middleware/authenticateJWT');


const assetRouter = express.Router()

assetRouter.get('/all-user/:userId',authenticateJWT ,getAllAssetData)
assetRouter.get('/',authenticateJWT, getAssetData)
assetRouter.post('/:coinId/buy',authenticateJWT, postBuyCoins)
assetRouter.post('/:coinId/sell',authenticateJWT, postSellCoins)
module.exports = assetRouter