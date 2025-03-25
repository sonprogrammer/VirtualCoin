import mongoose from "mongoose";

const HoldingSchema = new mongoose.Schema({

    //유저
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //코인
    coinMarket:{
        type: String,
        required: true
    },
    coinKName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['BUY', 'SELL'],
        required: true
    },

    //주문수량 
    orderQuantity: {
        type:Number,
        required: true
    },

    // 주문 가격
    orderPrice: {
        type:Number,
        required: true
    },
    //미체결량
    remainQuantity: {
        type: Number,
        required: true
    },

    // 주문 시간
    orderTime: {
        type: Date,
        required: true
    }

   
}, { timestamps: true})

const Holding = mongoose.model("Holding", HoldingSchema);
module.exports = Holding
