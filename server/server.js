// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5001;

// CORS 설정
app.use(cors());

// 클라이언트에서 오는 요청을 처리할 엔드포인트 설정
app.get('/api/klines', async (req, res) => {
  const { interval = '1m', symbol = 'BTCUSDT', limit = 10 } = req.query;

  try {
    // Binance API로부터 코인 차트 데이터 가져오기
    const response = await axios.get('https://api.binance.com/api/v3/klines', {
      params: {
        symbol,
        interval,
        limit,  // 요청할 데이터의 개수
      },
    });

    // 응답을 클라이언트로 전달
    res.json(response.data);
  } catch (error) {
    // 에러 처리
    console.error('Error fetching data from Binance:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server running on http://localhost:77`);
});
