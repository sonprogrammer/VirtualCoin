const express = require('express');
const { createGuestUser, kakaoLogin } = require('../Controller/userController');


const userRouter = express.Router()


userRouter.post('/guest-login', createGuestUser)
userRouter.post('/kakao-login', kakaoLogin)
userRouter.get('/like-toggle',)

module.exports = userRouter