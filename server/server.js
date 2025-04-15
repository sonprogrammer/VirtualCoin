
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
const { default: axios } = require('axios');
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
    secure: true,
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
app.use('/api/chart', async(req, res) => {
  const { market, unit, type, count, to } = req.query

  try {
    if (!market || !type) {
      return res.status(400).json({ message: 'Missing required query parameters' });
    }
  
    let url = '';
    if (type === 'minutes') {
      if (!unit) return res.status(400).json({ message: 'unit is required for minutes' });
      url = `https://api.upbit.com/v1/candles/minutes/${unit}`;

    } else {
      url = `https://api.upbit.com/v1/candles/${type}`;
    }
    const params = { market, count}
    if(to) params.to = to
    const response = await axios.get(url, {params});

    res.json(response.data)
  } catch (error) {
    console.error(error.response?.data || error.message)
    res.status(500).json({message: 'internal server error'})
  }
})

// 서버 실행
app.listen(port, () => {
  console.log(`Server running on http://localhost:3000`);
});
