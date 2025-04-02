const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({

    // 거래한 유저 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    coins: [{
        market: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["BUY", "SELL"],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        kName: {
            type: String,
            required: true
        },
        orderTime: {
            type: Date,
            default: Date.now
        },
        completedTime: {
            type: Date,
            default: null
        }
    }],
})

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction
