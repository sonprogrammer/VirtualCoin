import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({

    // 거래한 유저 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    //거래한 코인
    coin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coin",
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

    //!총 거래 금액 -> 거래가격이랑  거래수량 곱하면됨 -> 삭제가능 
    total:{
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
    createAt:{
        type: Date,
        default: Date.now
    }
})

export const Transaction = mongoose.model("Transaction", TransactionSchema);
