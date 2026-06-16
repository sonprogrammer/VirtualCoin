import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface CoinsData{
    market: string;
    korean_name: string;
}

const getCoins = async():Promise<CoinsData[]> => {
    const res = await axios.get<CoinsData[]>(`${import.meta.env.VITE_API_URL}/api/coins`)
    return res.data.filter((coin) => coin.market.startsWith("KRW-"))
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