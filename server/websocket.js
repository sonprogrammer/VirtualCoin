const WebSocket = require("ws");

const webSocket = (server) => {
  const wss = new WebSocket.Server({ server, path: '/ws'});
  let upbitSocket = null;

  wss.on('connection', (clientSocket) => {
    console.log('connected websocket');

    if (!upbitSocket) {
      upbitSocket = new WebSocket('wss://api.upbit.com/websocket/v1');
    }

    clientSocket.on('message', (message) => {
      try {
        if (upbitSocket.readyState === WebSocket.OPEN) {
          upbitSocket.send(message);
        } else {
          upbitSocket.on('open', () => {
            upbitSocket.send(message);
          });
        }
      } catch (err) {
        console.error('Error sending message to Upbit:', err);
      }
    });

    if (!upbitSocket.listenerCount('message')) {
      upbitSocket.on('message', (data) => {
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });
    }

    upbitSocket.on('error', (error) => {
      console.error('websocket error', error);
    });

    clientSocket.on('close', () => {
      console.log('disconnected websocket');
      if (wss.clients.size === 0 && upbitSocket.readyState === WebSocket.OPEN) {
        upbitSocket.close();
        upbitSocket = null;
      }
    });
  });
};

module.exports = { webSocket };
