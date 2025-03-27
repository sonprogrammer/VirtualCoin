const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    coinMarket: {
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
    orderQuantity: {
        type: Number,
        required: true
    },
    orderPrice: {
        type: Number,
        required: true
    },
    //*주문시간
    orderTime: {
        type: Date,
        required: true
    },
    //*체결 상태
    status:{
        type: String,
        enum: ['COMPLETED', 'PENDING'],
        default: 'PENDING'
    },
    //*체결시간
    completedTime:{
        type: Date,
        default: null
    }
});

const HoldingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orders: [OrderSchema] 
}, { timestamps: true });

const Hold = mongoose.model('Hold', HoldingSchema);
module.exports = Hold;
