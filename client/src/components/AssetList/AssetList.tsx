

import Skeleton from '@mui/material/Skeleton';
import useGetAssetData from '../../hooks/useGetAssetData';

import { StyledContainer, StyledTable, StyledTableBody, StyledTableHead} from './style';
import { AssetRow } from './AssetRow';


const AssetList = () => {
    const { data: assetData, isLoading } = useGetAssetData()

    if (isLoading) {
        return (
            <div className='w-full space-y-2'>
                <Skeleton variant='rectangular' height={50} sx={{ bgcolor: '#18181b' }} />
                <Skeleton variant='rectangular' height={200} sx={{ bgcolor: '#18181b' }} />
            </div>
        );
    }


    const coins = assetData?.coins.filter((c) => c.amount !== 0) || []


    return (
        <StyledContainer>
            <StyledTable>
                <StyledTableHead>
                    <tr>
                        <th className='w-[25%]'>보유자산</th>
                        <th>보유수량</th>
                        <th>매수평균가</th>
                        <th>평가금액</th>
                        <th className='w-[20%]'>평가손익(%)</th>
                    </tr>
                </StyledTableHead>
                <StyledTableBody>
                    {coins.map(coin => 
                        <AssetRow key={coin.market} coin={coin}/>
                    )}
                  
                </StyledTableBody>
            </StyledTable>
        </StyledContainer>
    )
}

export default AssetList
