const express = require('express')
const { getTransactions, getPendingCoins } = require('../Controller/transactionController')
const authenticateJWT = require('../middleware/authenticateJWT')

const transactionRouter = express.Router()

transactionRouter.get('/:userId',authenticateJWT, getTransactions)

module.exports = transactionRouter