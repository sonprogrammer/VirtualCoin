import { Navigate, Route, Routes } from "react-router-dom"
import { AssetPage, CoinDetailPage, LandingPage, LayoutPage, MainPage, NotfoundPage, RankingPage } from "./pages"
import { useRecoilValue } from "recoil"
import { userState } from "./context/userState"
import ProtectNoUser from "./utils/protectNoUser"
import { LoginRequestComponent } from "./components"



function App() {

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
      <LoginRequestComponent />
    </>
  )
}

export default App
