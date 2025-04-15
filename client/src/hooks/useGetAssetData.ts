import axios from "axios"
import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import { useQuery } from "@tanstack/react-query"



const useGetAssetData =  () => {
    const user = useRecoilValue(userState)

    const fetchData = async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/api/asset?userId=${user._id}`)
            return res.data

        
    }
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['asset', user._id],
        queryFn: fetchData,
    })
    
    return { data, isLoading, error, refetch}

    
}

export default useGetAssetData