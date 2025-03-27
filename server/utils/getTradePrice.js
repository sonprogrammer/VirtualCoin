const WebSocket = require('ws')

const prices = {}

const startWebSocket =(coins) => {
    if(!coins || coins.length === 0) return

    const ws = new WebSocket("wss://api.upbit.com/websocket/v1")

    ws.onopen = () => {
        console.log('websocket connected')
        ws.send(
            JSON.stringify([
                {ticket: 'server_coin_list'},
                { type: 'ticker', codes: coins.map(c => c.market)}
            ])
        )
    }


    ws.onmessage = (e) => {
        e.data.text().then(text => {
            try {
                const data = JSON.parse(text)
                prices[data.code] = {
                    trade_price: data.trade_price
                }
                console.log(' updated prices')
            } catch (error) {
                console.log(error)
            }
        })
    }

    ws.onclose = () => {
        console.log('disconnect')
    }

    ws.onerror = (error) => {
        console.log('error', error)
    }
}

module.exports = { startWebSocket, prices}