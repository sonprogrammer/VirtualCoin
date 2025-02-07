import { useState } from "react"
import { CoinModal } from "../CoinModal";


interface InterestedCoinProps{
    handleOutsideClick: () => void;
}


const InterestedCoin = ({handleOutsideClick} : InterestedCoinProps) => {
    const [coinData, setCoinData] = useState([
        { name: '비트코인', yester: '50000', current: '51000' },
        { name: '이더리움', yester: '30000', current: '510000' },
        
      ]);
    
    
      return(
         <CoinModal title="관심코인" coinData={coinData} onClickOutside={handleOutsideClick} />
  )
}

export default InterestedCoin
