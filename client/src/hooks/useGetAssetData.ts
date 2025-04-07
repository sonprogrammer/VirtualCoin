import axios from "axios"
import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import { useQuery } from "@tanstack/react-query"



// interface AssetCalculation  {
//     totalAssets: number;
//     totalValuationAmount: number;
//     availableOrder: number;
//     totalProfitLoss: number;
//     totalProfitRate: number;
//     totalBuy: number;
// };


const useGetAssetData =  () => {
    const user = useRecoilValue(userState)

    const fetchData = async () => {
        // if(user.isGuest){
        //     const savedAssetData = localStorage.getItem('asset')
        //     // console.log('savedAsset', savedAssetData)
        //     return savedAssetData ? JSON.parse(savedAssetData) : null
        // }else{
            const res = await axios(`http://localhost:3000/api/asset?userId=${user._id}`)

            return res.data

        // }
        
    }
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['asset', user._id],
        queryFn: fetchData,
    })
    // console.log('data', data) --> cash랑 코인배열들어옴

    
    return { data, isLoading, error, refetch}

    
}

export default useGetAssetData