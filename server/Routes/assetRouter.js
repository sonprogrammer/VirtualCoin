const express = require('express');
const { getAssetData, postBuyCoins } = require('../Controller/assetController');


const assetRouter = express.Router()


assetRouter.get('/', getAssetData)
assetRouter.post('/:coinId/buy', postBuyCoins)
module.exports = assetRouter