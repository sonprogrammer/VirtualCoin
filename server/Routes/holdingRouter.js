const express = require('express');
const { postBuyReserve, postSellReserve, getPendingCoins, postDeleteOrder, getTransactionCoins } = require('../Controller/holdingController');
const authenticateJWT = require('../middleware/authenticateJWT');
const holdRouter = express.Router()

holdRouter.post('/:coinId/buy-reserve',authenticateJWT, postBuyReserve)
holdRouter.post('/:coinId/sell-reserve',authenticateJWT, postSellReserve)
holdRouter.get('/pending/:userId',authenticateJWT, getPendingCoins)
holdRouter.post('/pending-delete/:userId',authenticateJWT, postDeleteOrder)
holdRouter.get('/all-transaction/:userId',authenticateJWT, getTransactionCoins)

module.exports = holdRouter

