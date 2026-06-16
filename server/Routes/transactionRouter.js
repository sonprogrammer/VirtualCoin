const express = require('express')
const { getTransactions, getPendingCoins } = require('../Controller/transactionController')
const authenticateJWT = require('../middleware/authenticateJWT')

const transactionRouter = express.Router()

transactionRouter.get('/:userId',authenticateJWT, getTransactions)
transactionRouter.post('buy', authenticateJWT, )

module.exports = transactionRouter