
import { useRecoilState } from "recoil"
import { CoinPrice } from "../context/CoinPrice"
import { useMemo } from 'react';


interface AssetData {
    cash: number;
    coins: any[];
}

interface CoinDetailPrice {
    coinValue: number;
    profitLoss: number;
    profitRate: number;
}
interface CalculateAssets {
    totalAssets: number;
    totalValuationAmount: number;
    availableOrder: number;
    totalProfitLoss: number;
    totalProfitRate: number;
    totalBuy: number;
    currentCoinPrice: number[];
    coinDetailPrice: CoinDetailPrice[]
}
const useCalculateAsset = (assetData: AssetData) => {
    const [prices] = useRecoilState(CoinPrice); 


    const calculateAssets = useMemo<CalculateAssets>(() => {
        if (!assetData || !assetData.coins) return {
            totalAssets: 0,
            totalValuationAmount: 0,
            availableOrder: 0,
            totalProfitLoss: 0,
            totalProfitRate: 0,
            totalBuy: 0,
            currentCoinPrice: [],
            coinDetailPrice: []
        };

        const { cash, coins } = assetData

        const filteredCoins = coins.filter(coin => coin.amount !== 0)



        //* 총매수 금액
        const totalBuy = filteredCoins.reduce((acc: number, coin: any) => {
            const purchasePrice = coin.avgBuyPrice || 0; 
            const quantity = coin.amount || 0; 

            return acc + (purchasePrice * quantity)
        }, 0)

        
        // *총 평가 = 코인의 현재 가격 * 수량
        const totalValuationAmount = filteredCoins.reduce((acc: number, coin: any) => {
            const currentPrice = prices[coin.market]?.trade_price || 0;
            const quantity = coin.amount || 0;
            return acc + (currentPrice * quantity)
        }, 0)

        // *총 자산 = 보유 현금 + 코인 평가 손익
        const totalAssets = cash + totalValuationAmount

        // *주문 가능 금액 = 보유 현금
        const availableOrder = cash

        //* 총 평가 손익 = 총 자산에서 현금 부분을 제외한 부분
        const totalProfitLoss = totalValuationAmount - totalBuy

        //* 총 수익률 = (투자 평가액 - 투자 원금) / 투자 원금 * 100
        const totalProfitRate = totalBuy !== 0 ? parseFloat(((totalProfitLoss / totalBuy) * 100).toFixed(2)) : 0


        // *코인 현재 가격
        const currentCoinPrice = filteredCoins.map((coin: any) => {
            return prices[coin.market]?.trade_price}
        )

        // * 코인별 평가금액, 평가 손익
        const coinDetailPrice = filteredCoins.map((coin: any) => {
            const currentPrice = prices[coin.market]?.trade_price || 0
            const coinValue = currentPrice * coin.amount // *평가금액
            const profitLoss = coinValue - (coin.avgBuyPrice * coin.amount) //*평가손익
            const profitRate = ((currentPrice - coin.avgBuyPrice) / (coin.avgBuyPrice * coin.amount)) * 100

            return {
                ...coin,
                coinValue,
                profitLoss,
                profitRate: parseFloat(profitRate.toFixed(2))
            }
        })
        
        
        return {
            totalAssets,
            totalValuationAmount,
            availableOrder,
            totalProfitLoss,
            totalProfitRate,
            totalBuy,
            currentCoinPrice,
            coinDetailPrice
        }

    },[assetData, prices])

    return calculateAssets
}

export default useCalculateAsset
