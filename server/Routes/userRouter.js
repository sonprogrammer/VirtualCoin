const express = require('express');
const { createGuestUser } = require('../Controller/userController');


const userRouter = express.Router()


userRouter.post('/guest-login', createGuestUser)

module.exports = userRouter