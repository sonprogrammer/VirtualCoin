import axios from 'axios';
import { getAccessToken, saveAccessToken } from '../context/saveAccessToken';
import { toast } from 'react-toastify';



const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()

    if(token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (err) => Promise.reject(err)
)


  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/refresh`, {
            withCredentials: true,
          });
          const newAccessToken = response.data.token

          if (newAccessToken) {
            saveAccessToken(newAccessToken)
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          } 
        }catch(error){
          console.log(error)
          toast.error('토큰 만료 재로그인해주세요')
        }
      }

      return Promise.reject(error);
    }
  );


export default axiosInstance;
