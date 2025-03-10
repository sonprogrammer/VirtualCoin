const mongoose = require('mongoose')

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

    // 유저가 코인을 산 가격
    currentPrice:{
        type: Number,
        required: true
    },

    //유저가 산 코인 거래량
    volume:{
        type: Number,
        default: 0
    }
},{timestamps: true})

const Coin = mongoose.model('Coin', CoinSchema)
module.exports = Coin
