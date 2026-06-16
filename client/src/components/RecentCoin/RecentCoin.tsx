
import { CoinModal } from "../CoinModal";
import useGetRecentCoin from "../../hooks/useGetRecentCoin";
import useGetCoins from "../../hooks/useGetCoins";
import { useMemo } from "react";




interface RecentCoinProps {
    onClose: () => void;
}
const RecentCoin = ({ onClose }: RecentCoinProps) => {

    const { data: recentCoin } = useGetRecentCoin();
    const { data: coinName } = useGetCoins();


    const coinData = useMemo(() => {
        const coinSet = new Set(recentCoin)
        return coinName?.filter(c => coinSet.has(c.market))
            .map(name => ({ 
                coinKoreanName: name.korean_name, 
                coinMarket: name.market 
            })) ?? []
    }, [coinName, recentCoin])


    return <CoinModal title="최근 본 코인(10개)" coinData={coinData} onClose={onClose} />;
}

export default RecentCoin
