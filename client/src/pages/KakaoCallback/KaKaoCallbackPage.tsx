import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { toast } from 'react-toastify'
import { accessTokenState, userState } from '../../context/userState'
import axios from 'axios'
import { LoginCheck } from '../../components'


export function KakaoCallbackPage() {
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState)
    const setAccessToken = useSetRecoilState(accessTokenState)
    const requested = useRef(false)

    useEffect(() => {
        if (requested.current) return
        requested.current = true

        const handleKakaoCallback = async () => {
            const params = new URLSearchParams(window.location.search)
            const code = params.get('code')

            if (!code) {
                toast.error('카카오 인가 코드가 없습니다.')
                navigate('/', { replace: true })
                return
            }

            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/kakao-login`, { code }, { withCredentials: true })

                if (res.status === 200) {
                    const userData = res.data.user
                    setUser(userData)
                    setAccessToken(res.data.token)


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

    return (
        <LoginCheck 
            title='로그인 중입니다.'
            description='카카오 계정을 확인하고 있습니다.'
        />
    )
}

