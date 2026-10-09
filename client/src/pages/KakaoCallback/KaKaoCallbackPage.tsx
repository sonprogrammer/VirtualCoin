import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { toast } from 'react-toastify'
import { accessTokenState, userState } from '../../context/userState'
import axios from 'axios'
import { saveUserToLocalStorage } from '../../context/localStorage'


export function KakaoCallbackPage() {
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState)
    const  setAccessToken = useSetRecoilState(accessTokenState)
    const requested = useRef(false)

    useEffect(() => {
        if (requested.current) return
        requested.current = true

        const handleKakaoCallback = async () => {
            const params = new URLSearchParams(window.location.search)
            const code = params.get('code')
            console.log('code', code)

            if (!code) {
                toast.error('카카오 인가 코드가 없습니다.')
                navigate('/', { replace: true })
                return
            }

            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/kakao-login`, { code }, { withCredentials: true})
                
                if (res.status === 200) {
                    const userData = res.data.user
                    setUser(userData)
                    setAccessToken(res.data.token)
                
                    saveUserToLocalStorage(userData)

                    toast.success('로그인 성공!')
                    navigate('/browse', { replace: true })
                }
            } catch (error) {
                console.error('카카오 로그인 실패:', error)
                toast.error('로그인 중 문제가 발생했습니다.')
                navigate('/', { replace: true })
            }
        }

        handleKakaoCallback()
    }, [navigate, setAccessToken, setUser])

    return <div>카카오 로그인 처리 중...</div>
}

