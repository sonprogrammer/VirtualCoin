
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const userRouter = require('./Routes/userRouter')
const assetRouter = require('./Routes/assetRouter')
const transactionRouter = require('./Routes/transactionRouter')
const authenticateJWT = require('./middleware/authenticateJWT')
const cookieParser = require('cookie-parser');
const holdRouter = require('./Routes/holdingRouter');
const app = express();
const port = 3000;

// CORS 설정
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1800000,
    httpOnly: true,
    //TODO배포할때 secure: true로 바꾸기
    secure: false,
    sameSite: 'strict' 
  } 
}))
app.use(cookieParser()); 

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('mongodb connected'))
.catch(err=> console.error('error mongoDb connection error'))

app.use('/api/user', userRouter);  
app.use('/api/asset', assetRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/holding', holdRouter);

// 서버 실행
app.listen(port, () => {
  console.log(`Server running on http://localhost:3000`);
});
