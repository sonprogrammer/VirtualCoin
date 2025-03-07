import mongoose from "mongoose";

const HoldingSchema = new mongoose.Schema({

    //유저
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requried: true
    },
    //코인
    coin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coin',
        required: true
    },

    //보유 수량 
    quantity: {
        type:Number,
        requried: true
    },

    // 평균 매수가격
    averagePrice: {
        type:Number,
        requried: true
    },

    //총 매수 금액
    totalInvestment: {
        type: Number,
        required: true
    },

    //!현재 평가 금액 - 실시간 가격 *수량 -> 삭제 가능 
    currentValue:{
        type: Number,
        required: true
    },

    //!평가 손익 - 현재 평가금액 - 총 매수 금액 -> 삭제가능
    profitLoss:{
        type: Number,
        required: true
    },

    //!수익률 - ((평가 손익 / 총 매수 금액) * 100) -> 삭제 가능
    profitLossPercentage:{
        type: Number,
        required: true
    }
}, { timestamps: true})

export const Holding = mongoose.model("Holding", HoldingSchema);
