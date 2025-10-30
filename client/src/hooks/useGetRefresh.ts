import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const setupAxiosInterceptors = (setRefresh: (value: any) => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/refresh`, {
            withCredentials: true,
          });
          const newAccessToken = response.data.token;

          if (newAccessToken) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          } else {
            setRefresh({ expired: true, message: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.' });
          }
        } catch {
          setRefresh({ expired: true, message: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.' });
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
