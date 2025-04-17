const WebSocket = require("ws");

const webSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  let upbitSocket = null;

  const createUpbitSocket = () => {
    // Upbit WebSocket 연결을 생성하는 함수
    upbitSocket = new WebSocket('wss://api.upbit.com/websocket/v1');
    
    upbitSocket.on('open', () => {
      console.log('Upbit WebSocket connected');
    });

    upbitSocket.on('close', () => {
      console.log('Upbit WebSocket closed, reconnecting...');
      // 연결이 끊어졌을 경우 재연결을 시도
      createUpbitSocket();
    });

    upbitSocket.on('error', (error) => {
      console.error('Upbit WebSocket error:', error);
      // 오류가 발생했을 경우에도 재연결 시도
      createUpbitSocket();
    });

    upbitSocket.on('message', (data) => {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  };

  // 최초 연결
  createUpbitSocket();

  wss.on('connection', (clientSocket) => {
    console.log('Client connected to WebSocket server');

    clientSocket.on('message', (message) => {
      if (upbitSocket.readyState === WebSocket.OPEN) {
        upbitSocket.send(message);
      } else {
        upbitSocket.on('open', () => {
          upbitSocket.send(message);
        });
      }
    });

    clientSocket.on('close', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = { webSocket };


