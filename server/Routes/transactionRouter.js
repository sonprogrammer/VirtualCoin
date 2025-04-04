const express = require('express')
const { getTransactions, getPendingCoins } = require('../Controller/transactionController')

const transactionRouter = express.Router()

transactionRouter.get('/:userId', getTransactions)

module.exports = transactionRouter