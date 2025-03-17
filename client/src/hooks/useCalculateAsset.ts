import { calculatedAssetState } from '../context/calculatedAssetState';
import { useRecoilState } from "recoil"
import { CoinPrice } from "../context/CoinPrice"

interface AssetData {
    cash: number;
    coins: any[];
}

const useCalculateAsset = (assetData: AssetData) => {
    const [prices] = useRecoilState(CoinPrice); 
    const [assetCalculation, setAssetCalculation] = useRecoilState(calculatedAssetState)
    // console.log('priceData', prices)

    const calculateAssets = () => {
        const { cash, coins } = assetData

        //* 총매수 금액
        const totalBuy = coins.reduce((acc: number, coin: any) => {
            const purchasePrice = coin.avgBuyPrice || 0; 
            const quantity = coin.amount || 0; 

            return acc + (purchasePrice * quantity)
        }, 0)

        // *총 자산 = 보유 현금 + 코인 평가 손익
        const totalAssets = cash + totalBuy

        // *총 평가 = 코인의 현재 가격 * 수량
        const totalValuationAmount = coins.reduce((acc: number, coin: any) => {
            const currentPrice = prices[coin.coinId]?.trade_price || 0;
            const quantity = coin.amount || 0;
            return acc + (currentPrice * quantity)
        }, 0)

        // *주문 가능 금액 = 보유 현금
        const availableOrder = cash

        //* 평가 손익 = 총 자산에서 현금 부분을 제외한 부분
        const totalProfitLoss = totalValuationAmount - totalBuy

        //* 수익률 = (투자 평가액 - 투자 원금) / 투자 원금 * 100
        const totalRate = coins.reduce((acc: number, coin: any) => {
            const purchasePrice = coin.avgBuyPrice || 0;
            const quantity = coin.amount || 0;
            return acc + (purchasePrice * quantity)
        }, 0)

        const totalProfitRate = totalRate !== 0 ? ((totalValuationAmount - totalRate) / totalRate) * 100 : 0

        setAssetCalculation({
            totalAssets,
            totalValuationAmount,
            availableOrder,
            totalProfitLoss,
            totalProfitRate,
            totalBuy
        });
    }
    calculateAssets()

    return assetCalculation
}

export default useCalculateAsset
