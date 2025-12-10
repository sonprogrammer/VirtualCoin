import { Route, Routes, useNavigate } from "react-router-dom"
import { AssetPage, CoinDetailPage, LandingPage, LayoutPage, MainPage, NotfoundPage, RankingPage } from "./pages"
import ProtectNoUser from "./utils/ProtectNoUser"
import { useRecoilState, useRecoilValue } from "recoil"
import { refreshState } from "./context/refreshExpired"
import { useEffect } from "react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setupAxiosInterceptors } from "./hooks/useGetRefresh"
import useLogout from "./hooks/useLogout"
import { userState } from "./context/userState"




function App() {
  const [refresh, setRefresh] = useRecoilState(refreshState)
  const navigate = useNavigate()
  const [, setUser] = useRecoilState(userState);
  const {mutate: logoutMutate} = useLogout()

  useEffect(() => {
    setupAxiosInterceptors(setRefresh)
  }, [setRefresh])

  useEffect(() => {
    if(refresh.expired){
      toast.error('로그인 세션이 만료되었습니다. 재로그인 부탁드립니다.',{
        autoClose: 1000,
        hideProgressBar: true
      })
      logoutMutate()
        localStorage.removeItem('user')
        localStorage.removeItem('asset')
        localStorage.removeItem('accessToken')
        setUser(null)

        Object.keys(localStorage).forEach((key) => {
            if(key.startsWith('kakao')){
                localStorage.removeItem(key)
            }
        })
      navigate('/')
    }
  },[refresh, navigate])

  return (
    <>

      <Routes>
        <Route path="/" element={
          <LandingPage />
        } />
        <Route element={
          <LayoutPage />
        }>
          <Route path="/browse" element={
            <ProtectNoUser>
              <MainPage />
            </ProtectNoUser>
          }
          />
          <Route path="/coin/:coinId" element={
            <ProtectNoUser>
              <CoinDetailPage />
            </ProtectNoUser>
          } />
          <Route path="/asset" element={
            <ProtectNoUser>
              <AssetPage />
            </ProtectNoUser>
          } />
          <Route path="/rank" element={
            <ProtectNoUser>
              <RankingPage />
            </ProtectNoUser>
          } />

          <Route path="*" element={
            <NotfoundPage />
          } />
        </Route>
      </Routes>
      <ToastContainer position="top-center" />

    </>
  )
}

export default App
