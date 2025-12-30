const axios = require('axios')

const getRestCoinsTicker = async(req, res) => {
    try {
        const allCoins  = await axios.get('https://api.upbit.com/v1/market/all')
        const krwCoins = allCoins.data.filter(coin => coin.market.startsWith("KRW-")).map(m=> m.market)
        const tickerResponse = await axios.get(`https://api.upbit.com/v1/ticker?markets=${krwCoins}`)

        
        const tickerMap = tickerResponse.data.reduce((acc, cur) => {
            acc[cur.market] = {
                trade_price: cur.trade_price,
                change_rate: cur.signed_change_rate, // 전일 대비 등락율
                acc_price: cur.acc_trade_price_24h, // 24시간 거래대금
                change_price: cur.signed_change_price, // 전일 대비 등락폭
                trade_volume: cur.acc_trade_volume_24h,
                high_price: cur.high_price,
                low_price: cur.low_price,
                prev_closing_price: cur.prev_closing_price
            }
            return acc
        },{})
        res.status(200).json(tickerMap)

    } catch (error) {
        console.log('error', error)
        res.status(500).json({message:'internal server error'})
    }
}

module.exports = getRestCoinsTicker