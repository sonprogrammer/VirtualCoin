import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userState } from '../../context/userState'
import axiosInstance from './useGetRefresh'


export const useInitializeAuth = () => {
  const setUser = useSetRecoilState(userState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const initialize = async () => {
      try {
        const res = await axiosInstance.get('/user/me')

        if (!cancelled && res.data) {
          setUser(res.data.user)
        }
      } catch (error) {
        console.error(error)
        if (!cancelled) {
          setUser(null)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void initialize()

    return () => {
      cancelled = true
    }
  }, [setUser])

  return { isLoading }
}