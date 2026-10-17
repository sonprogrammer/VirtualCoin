const WebSocket = require("ws");
const axios = require("axios");

const webSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  let upbitSocket = null;
  let reconnectAttempts = 0;
  let reconnectTimer = null;
  let isConnecting = false;

  const scheduleReconnect = () => {
    if (reconnectTimer) return;

    const delay = Math.min(1000 * 2 ** reconnectAttempts, 30000);
    reconnectAttempts++;

    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      void createUpbitSocket();
    }, delay);
  };

  const createUpbitSocket = async () => {
    if (isConnecting) return;
    if (
      upbitSocket?.readyState === WebSocket.CONNECTING ||
      upbitSocket?.readyState === WebSocket.OPEN
    )
      return;

    if (reconnectTimer) return;

    isConnecting = true;
    try {
      const res = await axios.get("https://api.upbit.com/v1/market/all");
      const krwMarkets = res.data
                            .filter((item) => item.market.startsWith("KRW-"))
                            .map((item) => item.market);

      const socket = new WebSocket("wss://api.upbit.com/websocket/v1");
      let socketOpenedAt = null;
      upbitSocket = socket;
      isConnecting = false;
      let heartbeatTimer = null;
      let isAlive = true;
      let lastTickerAt = null;
      socket.on("pong", () => {
        isAlive = true;
      });

      socket.on("open", () => {
        if (upbitSocket !== socket) return;

        socketOpenedAt = Date.now();

        const subscribeMessage = [
          { ticket: "coin-ticker" },
          { type: "ticker", codes: krwMarkets },
          { type: "orderbook", codes: krwMarkets },
        ];
        socket.send(JSON.stringify(subscribeMessage));

        heartbeatTimer = setInterval(() => {
          if (socket.readyState !== WebSocket.OPEN) return;

          if (!isAlive) {
            console.warn("Upbit Pong 응답 없음 연결 종료");
            socket.terminate();
            return;
          }

          isAlive = false;

          socket.ping();
        }, 10000);

        const message = JSON.stringify({
          type: "upstream_connected",
        });

        wss.clients.forEach((cli) => {
          if (cli.readyState === WebSocket.OPEN) {
            cli.send(message);
          }
        });
      });

      socket.on("message", (data) => {
        if (upbitSocket !== socket) return;
        const message = data.toString();

        try {
          const parsed = JSON.parse(message);

          if (parsed.type === "ticker") {
            lastTickerAt = Date.now();
          }
        } catch (error) {
          console.warn("Upbit 메시지 파싱 실패", error);
        }

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });

      socket.on("close", () => {
        if (heartbeatTimer) {
          clearInterval(heartbeatTimer);
          heartbeatTimer = null;
        }
        if (upbitSocket !== socket) return;

        if (socketOpenedAt !== null && Date.now() - socketOpenedAt >= 30000) {
          reconnectAttempts = 0;
        }

        const message = JSON.stringify({
          type: "upstream_disconnected",
        });

        wss.clients.forEach((cli) => {
          if (cli.readyState === WebSocket.OPEN) {
            cli.send(message);
          }
        });

        scheduleReconnect();
      });

      socket.on("error", (error) => {
        console.error("Upbit WebSocket error", error);
        if (socket.readyState !== WebSocket.CLOSED) {
          socket.terminate();
        }
      });
    } catch (error) {
      isConnecting = false;
      console.error("코인 목록 불러오기 실패", error);
      scheduleReconnect();
    }
  };

  createUpbitSocket();

  wss.on("connection", (clientSocket) => {
    const isUpbitConnected = upbitSocket?.readyState === WebSocket.OPEN;

    clientSocket.send(
      JSON.stringify({
        type: isUpbitConnected ? "upstream_connected" : "upstream_disconnected",
      }),
    );
  });
};

module.exports = { webSocket };
