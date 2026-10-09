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

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
            <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-slate-800 bg-slate-900 px-6 py-12 shadow-xl">
                <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                    <div className="h-11 w-11 animate-spin rounded-full border-4 border-red-500/20 border-t-red-500" />
                </div>
                <h1 className="text-center text-xl font-semibold text-white">
                    안전하게 로그인하고 있어요
                </h1>
                <p className="mt-3 text-center text-sm leading-6 text-slate-400">
                    카카오 계정을 확인하고 있습니다.
                    <span className="block">잠시만 기다려 주세요.</span>
                </p>
                <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                    Virtual Coin 계정 연결 중
                </div>
            </div>
        </div>
    )
}

