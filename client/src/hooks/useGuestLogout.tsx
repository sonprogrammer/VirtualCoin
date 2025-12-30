import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./useGetRefresh";

const regularLogout = async() => {
    const res = await axiosInstance.post(`/api/user/regular-logout`)
    return res.data
}


const useGuestLogout = () => {
    return useMutation({
        mutationFn: regularLogout,
    })
}

export default useGuestLogout