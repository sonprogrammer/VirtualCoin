import { useEffect, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accessTokenState } from '../context/userState'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

let isRefreshing = false

let failedQueue: {
  res: (token: string) => void
  rej: (error: unknown) => void
}[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ res, rej }) => {
    if (error) {
      rej(error)
    } else if (token) {
      res(token)
    }
  })
  failedQueue = []
}

export const useAxiosInterceptor = () => {
  const accessToken = useRecoilValue(accessTokenState)
  const setAccessToken = useSetRecoilState(accessTokenState)
  const tokenRef = useRef(accessToken)
  console.log('accesstoken', accessToken)

  tokenRef.current = accessToken

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      const token = tokenRef.current
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
          return Promise.reject(error)
        }

        originalRequest._retry = true

        if (isRefreshing) {
          return new Promise<string>((res, rej) => {
            failedQueue.push({ res, rej })
          }).then((newAccessToken) => {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return axiosInstance(originalRequest)
          })
        }

        isRefreshing = true

        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/refresh`, {
            withCredentials: true
          })
          const newAccessToken = response.data.token

          if (!newAccessToken) {
            throw new Error('Access Token 재발급 실패')
          }

          tokenRef.current = newAccessToken
          setAccessToken(newAccessToken)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          processQueue(null, newAccessToken)

          return axiosInstance(originalRequest)
        } catch (refreshError) {
          processQueue(refreshError)
          tokenRef.current = null
          setAccessToken(null)
          toast.error('토큰 만료 재로그인해주세요')
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }
    )

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [setAccessToken])
}

export default axiosInstance