
import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./useGetRefresh"



const useGetAssetData =  () => {
    const user = useRecoilValue(userState)

    const fetchData = async () => {
        if(!user) return null
            const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/asset?userId=${user._id}`)
            return res.data

        
    }
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['asset'],
        queryFn: fetchData,
    })
    
    return { data, isLoading, error, refetch}

    
}

export default useGetAssetData