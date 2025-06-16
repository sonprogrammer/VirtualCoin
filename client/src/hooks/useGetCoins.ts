import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


const getCoins = async() => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/coins`)
    return res.data.filter((coin:any) => coin.market.startsWith("KRW-"))
}

const useGetCoins = () => {
    return useQuery({
        queryKey: ['coins'],
        queryFn: getCoins,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })
}

 
export default useGetCoins