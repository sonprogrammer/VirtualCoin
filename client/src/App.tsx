import { Route, Routes } from "react-router-dom"
import { AssetPage, CoinDetailPage, KakaoCallbackPage, LandingPage, LayoutPage, MainPage, NotfoundPage, RankingPage } from "./pages"
import ProtectNoUser from "./utils/ProtectNoUser"
import 'react-toastify/dist/ReactToastify.css';
import { KakaoInitializer } from "./components";
import { useAxiosInterceptor } from "./hooks/auth/useGetRefresh";
import { useInitializeAuth } from "./hooks/auth/useInitializeAuth";





function App() {
  useAxiosInterceptor()
  const { isLoading } = useInitializeAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로그인 상태를 확인하고 있습니다...</p>
      </div>
    )
  }

  return (
    <>
      <KakaoInitializer />
      <Routes>
        <Route path="/" element={
          <LandingPage />
        } />
        <Route path="/callback" element={<KakaoCallbackPage />} />
        <Route element={
          <LayoutPage />
        }>
          <Route path="/browse" element={
            <ProtectNoUser>
              <MainPage />
            </ProtectNoUser>
          }
          />
          <Route path="/coin/:coinEName" element={
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

    </>
  )
}

export default App
