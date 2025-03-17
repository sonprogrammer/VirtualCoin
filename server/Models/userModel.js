const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({


    kakaoId: {
        type: String,
        unique: true, // 같은 카카오 계정으로 중복 가입 방지
        sparse: true  // null 값을 허용하여 게스트 계정과 충돌 방지
    },
    //카카오로그인이면 카톡이름, 게스트면 랜덤 생성
    name: {
        type: String,
        required: true,
        unique: true
    },
    //30분동안 아무것도 하지 않으면 자동로그아웃되고 2차비밀번호 입력창 나옴 - 카카오계정에서만 
    secondPassword: {
        type: String,
    },

    //게스트인지 여부 확인
    isGuest: {
        type: Boolean,
        default: true
    },

    //관심코인
    interestedCoins:[String]
    ,

    //최근 본 코인 - 카톡이면 디비에 저장, 게스트면 로컬스토리지에 저장
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