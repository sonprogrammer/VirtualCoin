const express = require('express');
const { postBuyReserve, postSellReserve } = require('../Controller/holdingController');
const holdRouter = express.Router()

holdRouter.post('/:coinId/buy-reserve', postBuyReserve)
holdRouter.post('/:coinId/sell-reserve', postSellReserve)

module.exports = holdRouter