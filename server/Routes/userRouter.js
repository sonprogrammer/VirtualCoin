const express = require('express');
const { createGuestUser, kakaoLogin, kakaoGetLikeCoins, kakaoLikeToggle, getRecentCoins, postRecentCoins, kakaoLogout } = require('../Controller/userController');
const authenticateJWT = require('../middleware/authenticateJWT');
const {refreshAccessToken} =require('../middleware/refreshAccessToken')

const userRouter = express.Router()


userRouter.post('/guest-login', createGuestUser)
userRouter.post('/kakao-login', kakaoLogin)
userRouter.post('/kakao-logout', kakaoLogout)
userRouter.get('/liked-coins',authenticateJWT, kakaoGetLikeCoins)
userRouter.post('/:coinId/like', authenticateJWT, kakaoLikeToggle)
userRouter.get('/recentCoin', authenticateJWT, getRecentCoins)
userRouter.post('/:coinId/recentCoin',authenticateJWT, postRecentCoins)
userRouter.get('/refresh', refreshAccessToken)

module.exports = userRouter