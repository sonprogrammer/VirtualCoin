const express = require('express')
const { getTransactions } = require('../Controller/transactionController')

const transactionRouter = express.Router()

transactionRouter.get('/:userId', getTransactions)

module.exports = transactionRouter