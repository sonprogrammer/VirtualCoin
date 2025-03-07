import mongoose from "mongoose"


const CoinSchema = new mongoose.Schema({

    //코인이름
    name: {
        type: String,
        required: true,
        unique: true
    },
    //코인짧은 이름
    initial: {
        type: String,
        required: true,
        unique: true
    },

    // 실시간 가겨
    currentPrice:{
        type: Number,
        required: true
    },
    //변동률
    priceChange:{
        type:Number,
        default: 0
    },

    //거래량
    volume:{
        type: Number,
        default: 0
    }
},{timestamps: true})

export const Coin = mongoose.model('Coin', CoinSchema)