const express = require('express');
const { createGuestUser, kakaoLogin, getLikeCoins, likeToggle,logout,getMe, getRecentCoins, postRecentCoins, kakaoLogout, regularLogout } = require('../Controller/userController');
const authenticateJWT = require('../middleware/authenticateJWT');
const {refreshAccessToken} =require('../middleware/refreshAccessToken')

const userRouter = express.Router()


userRouter.post('/guest-login', createGuestUser)
userRouter.post('/kakao-login', kakaoLogin)

userRouter.post('/guest-logout', logout)

userRouter.get('/liked-coins', authenticateJWT, getLikeCoins)
userRouter.post('/:coinId/like', authenticateJWT, likeToggle)
userRouter.get('/recentCoin', authenticateJWT, getRecentCoins)
userRouter.post('/:coinId/recentCoin',authenticateJWT, postRecentCoins)
userRouter.get('/refresh', refreshAccessToken)
userRouter.get('/me', authenticateJWT, getMe)


module.exports = userRouter