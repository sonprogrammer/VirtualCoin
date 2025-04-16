const WebSocket = require("ws");

const webSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  let upbitSocket = null;

  wss.on("connection", (clientSocket) => {
    console.log("✅ [server] connected websocket");

    // 최초 Upbit 소켓 연결
    if (!upbitSocket || upbitSocket.readyState !== WebSocket.OPEN) {
      upbitSocket = new WebSocket("wss://api.upbit.com/websocket/v1");

      upbitSocket.on("open", () => {
        console.log("✅ [server] connected to Upbit");
      });

      upbitSocket.on("message", (data) => {
        console.log("📡 [server] received data from Upbit");
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });

      upbitSocket.on("error", (err) => {
        console.error("❌ [server] Upbit socket error:", err);
      });

      upbitSocket.on("close", () => {
        console.log("🔌 [server] Upbit socket closed");
      });
    }

    // 클라이언트 → 서버 → Upbit
    clientSocket.on("message", (message) => {
      console.log("📨 [server] received from client:", message);
      if (upbitSocket.readyState === WebSocket.OPEN) {
        upbitSocket.send(message);
      } else {
        upbitSocket.once("open", () => {
          upbitSocket.send(message);
        });
      }
    });

    clientSocket.on("close", () => {
      console.log("❎ [server] client disconnected");
      if (wss.clients.size === 0 && upbitSocket?.readyState === WebSocket.OPEN) {
        console.log("🔒 [server] closing Upbit socket (no clients)");
        upbitSocket.close();
        upbitSocket = null;
      }
    });
  });
};

module.exports = { webSocket };
