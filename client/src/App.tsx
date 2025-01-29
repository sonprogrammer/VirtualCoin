import { Route, Routes } from "react-router-dom"
import { LandingPage } from "./pages"
import LayoutPage from "./pages/LayoutPage/LayoutPage"

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={
            <LandingPage />    
          } />
          <Route path="browse" element={
            <LayoutPage />
          } />
        </Routes> 
    </>
  )
}

export default App
