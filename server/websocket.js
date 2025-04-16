import WebSocket from "ws";

export const webSocket = (server) => {
    const wss = new WebSocket.Server({server})
    let upbitSocket = null;


    wss.on('connection', (clientSocket)=> {
        console.log('connected websocket')

        if (!upbitSocket) {
            upbitSocket = new WebSocket('wss://api.upbit.com/websocket/v1');
        }


        clientSocket.on('message', (message) => {
                if(upbitSocket.readyState === WebSocket.OPEN){
                    upbitSocket.send(message)
                }else{
                    upbitSocket.on('open', () => {
                        upbitSocket.send(message)
                    })
                }
        })

        upbitSocket.on('message', (data) => {
            if(clientSocket.readyState === WebSocket.OPEN){
                clientSocket.send(data)
            }
        })

        upbitSocket.on('error', (error)=> {
            console.error('websocket error', error)
        })

        clientSocket.on('close', () => {
            console.log('disconnected websocket')
            if (wss.clients.size === 0 && upbitSocket.readyState === WebSocket.OPEN) {
                upbitSocket.close();
            }        })
    })
}