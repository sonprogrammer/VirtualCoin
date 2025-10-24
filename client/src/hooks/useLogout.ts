import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./useGetRefresh";

const logout = async() => {
    const res = await axiosInstance.post(`/api/user/kakao-logout`)
    return res.data
}

const useLogout = () => {
    return useMutation({
        mutationFn: logout
    })
}

export default useLogout