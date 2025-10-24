const WebSocket = require("ws");
const axios = require("axios");

const webSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  let upbitSocket = null;

  const createUpbitSocket = async () => {
    try {

      const res = await axios.get('https://api.upbit.com/v1/market/all');
      const krwMarkets = res.data
        .filter((item) => item.market.startsWith('KRW-'))
        .map((item) => item.market);

      upbitSocket = new WebSocket('wss://api.upbit.com/websocket/v1');

      upbitSocket.on('open', () => {
        console.log('Upbit WebSocket connected');

        const subscribeMessage = [
          { ticket: "coin-ticker" },
          { type: "ticker", codes: krwMarkets },
          { type: "orderbook", codes: krwMarkets }
        ];
        upbitSocket.send(JSON.stringify(subscribeMessage));
      });

      upbitSocket.on('message', (data) => {
        const message = data.toString();
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });

      upbitSocket.on('close', () => {
        console.log('Upbit WebSocket closed.');
        setTimeout(createUpbitSocket, 2000);
      });

      upbitSocket.on('error', (error) => {
        console.error('Upbit WebSocket error:', error);
        upbitSocket.close()
      });

    } catch (error) {
      console.error("코인 목록 불러오기 실패:", error);
      setTimeout(createUpbitSocket, 5000);
    }
  };

  createUpbitSocket();

  wss.on('connection', (clientSocket) => {
    console.log('클라이언트 WebSocket 연결됨');

    clientSocket.on('close', () => {
      console.log('클라이언트 연결 종료');
    });

    clientSocket.on('message', (msg) => {
      console.log(' 라이언트 메시지(무시):');
    });
  });
};

module.exports = { webSocket };
