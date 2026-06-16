
import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./useGetRefresh"
import { AssetCoinsData } from "./useCalculateAsset";


interface AssetData {
    cash: number;
    coins: AssetCoinsData[];
    userId: {
        _id: string;
        name: string;
    }
}

const useGetAssetData = () => {
    const user = useRecoilValue(userState)

    const fetchData = async (): Promise<AssetData> => {
        if (!user?._id) {
            throw new Error("User not found");
        }
        const res = await axiosInstance.get<AssetData>(`${import.meta.env.VITE_API_URL}/api/asset?userId=${user._id}`)
        return res.data


    }
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['asset'],
        queryFn: fetchData,
        enabled: !!user._id,
        staleTime: 1000 * 60 *1,
        gcTime: 1000 * 60 * 5
    })

    return { data, isLoading, error, refetch }


}

export default useGetAssetData