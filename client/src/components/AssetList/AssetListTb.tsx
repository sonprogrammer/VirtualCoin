
import { StyledNonCoins, StyledTbContainer} from './style'
import useGetAssetData from '../../hooks/useGetAssetData'
import Skeleton from '@mui/material/Skeleton'
import { AssetTbRow } from './AssetTbRow'


// !테블릿버전
const AssetListTb = () => {
    const { data: assetData } = useGetAssetData()
    if (!assetData) {
        return <div className='h-64'>
            <Skeleton variant='rectangular' height='100%' />
        </div>;
    }


    const coins = assetData?.coins.filter((c) => c.amount !== 0) || []

    return (
        <StyledTbContainer className='tbcontainer'>
            {
                coins.length === 0 ?
                    <StyledNonCoins>there is no coins</StyledNonCoins>
                    : (
                        coins.map((coin) => {
                            return (
                                <AssetTbRow key={coin.market} coin={coin} />
                            )
                        })
                    )
            }
        </StyledTbContainer>
    )
}

export default AssetListTb
