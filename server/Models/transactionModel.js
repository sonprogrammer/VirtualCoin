const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({

    // 거래한 유저 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    //거래한 코인
    coinMarket:{
        type: String,
        required: true
    },

    // 매수 또는 매도 타입
    type: {
        type: String,
        enum: ["BUY", "SELL"],
        required: true
    },
    // 거래한 가격
    price: {
        type: Number,
        required: true
    },
    //거래한 수량 
    quantity: {
        type: Number,
        required: true
    },

    //체결 상태
    status:{
        type: String,
        enum: ['COMPLETED', 'PENDING'],
        default: 'COMPLETED'
    },
    //주문시간
    orderTime: {
        type: Date,
        required: true
    },

    //체결시간
    completedTime:{
        type: Date,
        default: Date.now
    }
})

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction
