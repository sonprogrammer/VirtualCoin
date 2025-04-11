
const calculateAllUserAsset = ((users, prices) => {
    return users.map(user => {
        const { coins, cash, userId } = user
        // console.log('user', user)

        const totalBuy = coins.reduce((acc, coin) => {
            return acc + (coin.avgBuyPrice * coin.amount)
        },0)

        const totalValuationAmount = coins.reduce((acc, coin) => {
            const currentPrice = prices[coin.market]?.trade_price || 0
            return acc + (currentPrice * coin.amount)
        },0)
        
        // *총자산
        const totalAsset = cash + totalValuationAmount
        //*총손익
        const totalProfit = totalValuationAmount - totalBuy
        // *수익률(투자를 안했으면 0 했으면 계산)
        const profitRate = totalBuy !== 0 ? parseFloat(((totalProfit / totalBuy) * 100).toFixed(2)) : 0
        
        // *사용자이름
        const name = userId.name

        return{
            name,
            totalAsset,
            totalProfit,
            profitRate
        }
    })
})

export default calculateAllUserAsset