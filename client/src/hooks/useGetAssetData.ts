import axios from "axios"
import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import { useQuery } from "@tanstack/react-query"



const useGetAssetData =  () => {
    const user = useRecoilValue(userState)

    const fetchData = async () => {
            const res = await axios(`http://localhost:3000/api/asset?userId=${user._id}`)
            return res.data

        
    }
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['asset', user._id],
        queryFn: fetchData,
    })
    
    return { data, isLoading, error, refetch}

    
}

export default useGetAssetData