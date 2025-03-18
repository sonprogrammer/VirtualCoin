const mongoose = require('mongoose')

const AssetSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cash:{
        type: Number,
        default: 10000000
    },
  
    coins: [{
        market: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        // *매수금액
        avgBuyPrice: {
            type: Number,
            required: true
        }
    }]
})

const Asset = mongoose.model('Asset', AssetSchema)
module.exports = Asset

