# VC(Virtual Coin)

this project built for beginners to explore real-time market and practice investing, gain understanding of coin world.
---

## 🎥 Demo Video(Click the image below to watch a short demo of the app)
[![Watch the demo](https://img.youtube.com/vi/ccbFX_n9WCk/0.jpg)](https://www.youtube.com/watch?v=ccbFX_n9WCk)

## 👀 let's going to coin world!
<a href="https://virtualcoinn.onrender.com/" target="_blank">VirtualCoin</a>

# 👤 Persona
- to help beginners experience and learn about coin world.
- 코인을 처음 접하는 사람들에게 친숙하고 직관적인 경험을 제공하고 싶어서 이 프로젝트를 시작했습니다.
- the combinations of development and my ambitious about coin made this project more enjoyable and meaningful.
- 개발을 하며 직접 코인에 대해 공부하고자 하는 의지에서 비롯되었습니다.하고 싶은 주제를 다루면 더욱 동기부여가 되고, 자연스럽게 몰입할 수 있었기 때문입니다.

---
## 🛠️ STACK
1. typescript
2. react
3. node
4. mongoDB
5. styled-component
6. tailwind
7. chartjs

---

## 🚀 major functions
| Page | Description |
|------|-------------|
| **Landing Page** | Supports **Kakao Login** and **Guest Login**<br/> Guest accounts are limited to the current device and **cannot be accessed again after logout** |
| **Navbar** | Displays the logged-in user's **asset information**, **interested coins**, and the **10 most recently viewed coins**. |
| **Search form** | When the user click the search component, it displays the **top 20 coins by trading volume** |
| **Main Page** | Shows a **real-time coin list** with current prices, trading volume, and percentage change from the previous day.<br/> Coins can be **sorted by trading volume in descending order**. |
| **Asset Page** | Divided into: <br/> 1. **Holdings** – shows cash balance, total profit/loss, and each coin profit/loss. <br/> 2. **Trade History** – lists completed transactions. <br/> 3. **Pending Orders** – displays reserved orders and allows cancellation. |
| **Ranking Page** | Displays a **real-time ranking** of users based on **profitRate** among all registered users. |
| **Coin Detail Page** | Includes **order book**, **trading interface**, and **candlestick charts**.<br/> Candlestick chart supports **minute**, **daily**, **weekly**, and **monthly** views. |
+ responsive web
+ Built as a **PWA**, it runs like a native app on both mobile and desktop—no installation needed.
--- 

## 📁 폴더 구조(Folder Structure)
- organized by components to improve Reusability and maintainbility.
- 컴포넌트 단위로 폴더를 구조화하여 재사용성과 유지보수성을 높였습니다.

---

## 🔄 실시간 데이터 처리 - WebSocket
- real-time data is essential due to the constantly changing of coin price
  - 실시간으로 시세가 변동되므로, WebSocket을 통해 실시간 가격 수신이 필요했습니다
- useing REST API too frequently cause `429 Too Many Requests` errors(upbit limits requests to 10 pre second)
  - 업비트의 REST API는 1초에 10회 이상 요청 시 429(Too Many Requests) 에러가 발생합니다
- `CORS` issues prevent direct requests from the browser
  - 브라우저에서 직접 요청 시 CORS 에러로 인해 데이터 접근이 차단됩니다
- websocket solve these problems by allowing the server to push data directly
  - WebSocket은 서버에서 데이터를 직접 Push해주므로, 성능과 안정성 면에서 효율적이었습니다.

---

## ⚙️Optimization
- `useCallback, useMemo` to prevent unnecessary reRender of function and values -> improved component rendering speed
- soft Delete : hides data on the client instead of actual deleting it. -> maintains data integrity, especially for related datasets
- proxy server for upbit api
  - upbit doesn't allow `CORS` so direct access fail
  - created a proxy server to fetch upbit data and forward it to browser

--- 
## 🔫troubleshooting
- i was going to use binance api but i found it too many coins.
  - so i switched to upbit api for beginner
- UI was poor and confusing at the first time.
  - redesigned to enhance clarify and usability

--- 
 
## ✏️what i learned
- by implementing `websocket`, i got understanding of how
- i resolved CORS issues using a proxy server which helped me understand browser and server security policies
- i became comfortable using `userCallback`, `useMemo`, `recoil` while optimizing state management and improving performance
- i improved my understanding of `React Query`
- i realized the importance of UI/UX again and learned the necessity of contiuous refactoring and design improvement to enhance user experience 


