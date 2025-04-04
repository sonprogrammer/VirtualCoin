const express = require('express');
const { postBuyReserve, postSellReserve, getPendingCoins, postDeleteOrder, getTransactionCoins } = require('../Controller/holdingController');
const holdRouter = express.Router()

holdRouter.post('/:coinId/buy-reserve', postBuyReserve)
holdRouter.post('/:coinId/sell-reserve', postSellReserve)
holdRouter.get('/pending/:userId', getPendingCoins)
holdRouter.post('/pending-delete/:userId', postDeleteOrder)
holdRouter.get('/all-transaction/:userId', getTransactionCoins)

module.exports = holdRouter

