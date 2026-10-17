
import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import { useQuery } from "@tanstack/react-query"

import { AssetCoinsData } from "./useCalculateAsset";
import axiosInstance from "./auth/useGetRefresh";


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
        const res = await axiosInstance.get<AssetData>(`/asset`)
        return res.data


    }
    const { data, isLoading, isPending, error, refetch } = useQuery({
        queryKey: ['asset', user?._id],
        queryFn: fetchData,
        enabled: !!user?._id,
        staleTime: 1000 * 60 *1,
        gcTime: 1000 * 60 * 5
    })

    return { data, isLoading, error, refetch, isPending }


}

export default useGetAssetData