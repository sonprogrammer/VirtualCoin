const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({


    kakaoId: {
        type: String,
        unique: true, 
        sparse: true  // null 값을 허용하여 게스트 계정과 충돌 방지
    },
    //카카오로그인이면 카톡이름, 게스트면 랜덤 생성
    name: {
        type: String,
        required: true,
        unique: true
    },
    secondPassword: {
        type: String,
    },

    isGuest: {
        type: Boolean,
        default: true
    },

    interestedCoins:[String]
    ,

    recentCoins:[String]
    ,


    //!주문 가능 금액(보유현금)
    availableBalance:{
        type: Number,
        default:10000000
    },

},{timestamps: true})

const User = mongoose.model('User',userSchema)
module.exports = User