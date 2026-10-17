const express = require('express');
const { postBuyReserve, postSellReserve, getPendingCoins, postDeleteOrder, getTransactionCoins } = require('../Controller/holdingController');
const authenticateJWT = require('../middleware/authenticateJWT');
const holdRouter = express.Router()

holdRouter.post('/:coinId/buy-reserve',authenticateJWT, postBuyReserve)
holdRouter.post('/:coinId/sell-reserve',authenticateJWT, postSellReserve)
holdRouter.get('/pending',authenticateJWT, getPendingCoins)
holdRouter.post('/pending-delete',authenticateJWT, postDeleteOrder)
holdRouter.get('/all-transaction',authenticateJWT, getTransactionCoins)

module.exports = holdRouter

