const User =  require('../Models/userModel')
const axios = require('axios')
const jwt = require('jsonwebtoken')


const createGuestUser = async (req, res) => {
    const generateGuestName = () => {
        const randomName = Math.floor(Math.random() *10000).toString().padStart(4,'0')
        return `VC_${randomName}`
    }

    try {
        let guestName = generateGuestName()

        let userExist = await User.findOne({name: guestName})
        while(userExist){
            guestName = generateGuestName()
            userExist = await User.findOne({name: guestName})
        }

        const newGuestUser = new User({
            name: guestName,
            isGuest: true,
            availableBalance: 10000000,
        })

        await newGuestUser.save()

        res.status(201).json(newGuestUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Internal server error'})
    }
}


const kakaoLogin = async(req, res) => {
    try {
        const { accessToken } = req.body;
        const userInfoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const kakaoId = userInfoRes.data.id; 
        const name = userInfoRes.data.kakao_account.profile.nickname;

        let user = await User.findOne({kakaoId})

        if(!user){
            user = new User({
                kakaoId,
                name,
                isGuest: false,
                interestedCoins: [],
                recentCoins: [],

            })
            await user.save()
        }

        

        const token = jwt.sign({ kakaoId: user.kakaoId, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ kakaoId: user.kakaoId }, process.env.JWT_SECRET, { expiresIn: '7d' });


        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'deploy', 
            maxAge: 3600000,
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'deploy', 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });
        
        res.status(200).json({ token, user, refreshToken })
    } catch (error) {
        console.error(error)
        res.status(500).json({error: '로그인 중 오류가 발생했습니다.'})
    }
} 

// * 카카오로그인 관심코인 토글
const kakaoLikeToggle = async(req, res) => {
    try {
        const kakaoId = req.user.kakaoId
        const { coinId } = req.params

        const user = await User.findOne({kakaoId})
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }

        const isAlreadyIn = user.interestedCoins.indexOf(coinId)

        if(isAlreadyIn === -1){
            user.interestedCoins.push(coinId)
        }else{
            user.interestedCoins.splice(isAlreadyIn, 1)
        }
        await user.save()

        res.status(200).json({interestedCoins: user.interestedCoins})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'internal server errror'})
    }

}

// * 카카오로그인 관심코인 가져오기
const kakaoGetLikeCoins = async (req, res) => {
    try {
        const kakaoId = req.user.kakaoId

        const user = await User.findOne({kakaoId})
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        const likedCoins = user.interestedCoins|| []
        if(!likedCoins){
            return res.status(402).json({message:"there is no interested coins"})
        }
        res.status(200).json({ likedCoins })
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'errorrorororo'})
    }
}


// *최근 본 코인 가져오기 최대 10개
const getRecentCoins = async(req, res) =>{
    try {
        const kakaoId = req.user.kakaoId
        
    
        const user = await User.findOne({kakaoId})
    
        if(!user){
            return res.status(401).json({message: 'user not found'})
        }
        const recentCoins = user.recentCoins || []

        res.status(200).json({ recentCoins})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'error message 500'})
    }
}

// *최근 본 코인 추가하기
const postRecentCoins = async(req, res) => {
    try {
        const { coinId } = req.params
        
        const kakaoId = req.user.kakaoId
    
        const user = await User.findOne({kakaoId})
        if(!user){
            return res.status(401).json({message: 'user not found'})
        }
    
        const isAlreadyIn = user.recentCoins.indexOf(coinId)
    
        if(isAlreadyIn === -1){
            user.recentCoins.unshift(coinId)
        }else{
            user.recentCoins.splice(isAlreadyIn, 1)
            user.recentCoins.unshift(coinId)
        }
    
        if(user.recentCoins.length > 10){
            user.recentCoins.pop()
        }
        await user.save()

        res.status(200).json({recentCoins: user.recentCoins})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'internal server errro'})
    }

}



module.exports =  {createGuestUser, kakaoLogin, kakaoGetLikeCoins,kakaoLikeToggle, getRecentCoins, postRecentCoins}