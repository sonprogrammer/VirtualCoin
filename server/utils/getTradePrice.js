const WebSocket = require('ws')
const Hold = require('../Models/holdingModel')

let currentPrice = {}
let ws


// *유저 예약 코인 목록 가져오기
const getUserReserveCoins = async(userId) => {
    const holdingOrders = await Hold.findOne({userId})

    if(!holdingOrders) return []

    return holdingOrders.orders.filter(order => order.status === 'PENDING')
        .map(order => order.coinMarket)
}


const startWebSocket = async (market) => {
    let userCoins = []

    userCoins = [market]
    
    console.log('coins from startWebsocket', market)
    if(!userCoins){
        console.log('there is no coins from startWebsocket')
        return
    } 

    if(ws) { ws.close()}

    ws = new WebSocket("wss://api.upbit.com/websocket/v1")

    ws.onopen = () => {
        console.log('websocket connected')
        ws.send(
            JSON.stringify([
                {ticket: 'server_coin_list'},
                { type: 'ticker', codes: userCoins}
            ])
        )
    }


    ws.onmessage = (e) => {
      
        const data = JSON.parse(e.data.toString())
        currentPrice[data.code] = data.trade_price
        // console.log('realtime price', currentPrice[data.code])
    }

    ws.onclose = () => {
        console.log('disconnect')
    }

    ws.onerror = (error) => {
        console.log('error')
    }
}

// * 예약된 모든 코인들
const startAllCoinsWebSocket = async(coinList) => {
    if(!coinList){ 
        console.log('there is no coinList')
        return
    }

    if(ws) {
        ws.close()
    }

    ws = new WebSocket('wss://api.upbit.com/websocket/v1')

    ws.onopen =() => {
        console.log('websocket connected on startAllCoinsWebsocket FN')
        ws.send(
            JSON.stringify([
                {ticket: 'server_coin_list'},
                { type: 'ticker', codes: coinList}
            ])
        )
    }

    ws.onmessage = (e) => {
        const data = JSON.parse(e.data.toString())
        currentPrice[data.code] = data.trade_price
        // console.log('realtime price', data.trade_price)
    }

    ws.onclose = () => {
        console.log('websocket disconnected')
    }

    ws.onerror = (error) => {
        console.log('websocket error', error)
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve() 
        }, 3000)
    })
}

const getCurrentPrice = (market) => {
    return currentPrice[market]
}

module.exports = { startWebSocket, getCurrentPrice, startAllCoinsWebSocket}
