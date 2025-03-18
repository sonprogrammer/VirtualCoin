
import { useRecoilState } from "recoil"
import { CoinPrice } from "../context/CoinPrice"
import { useMemo } from 'react';
import { calculatedAssetState } from "../context/calculatedAssetState";
import useWebSocket from "./useWebSocket";

interface AssetData {
    cash: number;
    coins: any[];
}
interface CalculateAssets {
    totalAssets: number;
    totalValuationAmount: number;
    availableOrder: number;
    totalProfitLoss: number;
    totalProfitRate: number;
    totalBuy: number;
    currentCoinPrice: number[];
}
const useCalculateAsset = (assetData: AssetData) => {
    const [prices] = useRecoilState(CoinPrice); 
    // const prices = useWebSocket(assetData.coins);
    // const realTimePrices = assetData?.coins ? useWebSocket(assetData.coins) : {};
 
    // console.log('realTimePrices', realTimePrices) 


    const calculateAssets = useMemo<CalculateAssets>(() => {
        if (!assetData || !assetData.coins) return {
            totalAssets: 0,
            totalValuationAmount: 0,
            availableOrder: 0,
            totalProfitLoss: 0,
            totalProfitRate: 0,
            totalBuy: 0,
            currentCoinPrice: []
        };

        const { cash, coins } = assetData
        // console.log('coinsssCAalll', coins)

        //* 총매수 금액
        const totalBuy = coins.reduce((acc: number, coin: any) => {
            const purchasePrice = coin.avgBuyPrice || 0; 
            const quantity = coin.amount || 0; 

            return acc + (purchasePrice * quantity)
        }, 0)

        
        // *총 평가 = 코인의 현재 가격 * 수량
        const totalValuationAmount = coins.reduce((acc: number, coin: any) => {
            const currentPrice = prices[coin.market]?.trade_price || 0;
            const quantity = coin.amount || 0;
            return acc + (currentPrice * quantity)
        }, 0)

        // *코인 현재 가격
        const currentCoinPrice = coins.map((coin: any) => {
            return prices[coin.market]?.trade_price}
        )


        // *총 자산 = 보유 현금 + 코인 평가 손익
        const totalAssets = cash + totalValuationAmount

        // *주문 가능 금액 = 보유 현금
        const availableOrder = cash

        //* 평가 손익 = 총 자산에서 현금 부분을 제외한 부분
        const totalProfitLoss = totalValuationAmount - totalBuy

        //* 수익률 = (투자 평가액 - 투자 원금) / 투자 원금 * 100
        const totalProfitRate = totalBuy !== 0 ? parseFloat(((totalProfitLoss / totalBuy) * 100).toFixed(2)) : 0.00

        return {
            totalAssets,
            totalValuationAmount,
            availableOrder,
            totalProfitLoss,
            totalProfitRate,
            totalBuy,
            currentCoinPrice
        }

    },[assetData, prices])

    return calculateAssets
}

export default useCalculateAsset
