import { atom } from "recoil";

export interface AssetCalculation {
    totalAssets: number;
    totalValuationAmount: number;
    availableOrder: number;
    totalProfitLoss: number;
    totalProfitRate: number;
    totalBuy: number;
}

export const calculatedAssetState = atom<AssetCalculation>({
    key: 'calculatedAssetState', 
    default: {
        totalAssets: 0,
        totalValuationAmount: 0,
        availableOrder: 0,
        totalProfitLoss: 0,
        totalProfitRate: 0,
        totalBuy: 0,
    },
});