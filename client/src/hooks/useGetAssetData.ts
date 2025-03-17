import axios from "axios"
import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import { useQuery } from "@tanstack/react-query"
import useCalculateAsset from "./useCalculateAsset"
import { useEffect, useState } from "react"
import { calculatedAssetState } from "../context/calculatedAssetState"


interface AssetCalculation  {
    totalAssets: number;
    totalValuationAmount: number;
    availableOrder: number;
    totalProfitLoss: number;
    totalProfitRate: number;
    totalBuy: number;
};


const useGetAssetData =  () => {
    const user = useRecoilValue(userState)

    const fetchData = async () => {
        if(user.isGuest){
            const savedAssetData = localStorage.getItem('asset')
            return savedAssetData ? JSON.parse(savedAssetData) : null
        }else{
            const res = await axios(`http://localhost:3000/api/asset?userId=${user._id}`)
            return res.data

        }
        
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ['asset', user._id],
        queryFn: fetchData,
        enabled: !!user._id
    })
    // console.log('data', data)

    
    return { data, isLoading, error}

    
}

export default useGetAssetData