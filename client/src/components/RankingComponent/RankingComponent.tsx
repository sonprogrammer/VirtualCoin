
import { useEffect, useState } from 'react'
import { StyledBox, StyledBtns, StyledContainer, StyledTable, StyledTableBody, StyledTableHead, StyledTitle } from './style'
import useGetAllUserAssetData from '../../hooks/useGetAllUserAssetData'
import { useRecoilValue } from 'recoil'
import { userState } from '../../context/userState'
import { CoinPrice } from '../../context/CoinPrice'
import calculateAllUserAsset from '../../utils/calculateAllUsersAsset'

const RankingComponent = () => {
    const [page, setPage] = useState<number>(1)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const prices = useRecoilValue(CoinPrice)

    const user = useRecoilValue(userState)
    const userId = user._id

    // *이거로 모든 유저의 정보를 가져옴
    const { data } = useGetAllUserAssetData(userId)

    const allUser = data?.allUser || []
    const rankData = calculateAllUserAsset(allUser, prices)?.sort((a:any, b: any) => b.profitRate - a.profitRate)

    const safeRankgData = Array.isArray(rankData) ? rankData : [];


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    },[])

    const myRank = rankData.findIndex((data:any) => data.id === userId) + 1


    const perPage = 10
    const firstPage = (page-1) * perPage
    const EachPage = safeRankgData.slice(firstPage, perPage + firstPage)
 

    return (
        <StyledContainer>
            <StyledTitle>
                <div>
                    <h1>랭킹 50</h1>
                    <p>*수익률 기준</p>
                </div>
                <h2>나의 순위 : {myRank}위</h2>
            </StyledTitle>
            <StyledBox className='box'>
                <StyledTable>
                    <StyledTableHead>
                        <th className='w-[50px]'>순위</th>
                        <th className='w-[70px]'>이름</th>
                        <th>총 자산</th>
                        <th>총 손익</th>
                        <th>수익률</th> 
                    </StyledTableHead>
                    <StyledTableBody>
                        {( windowWidth > 530 ? EachPage : safeRankgData).map((a:any, i:number) => {
                            const me = a.id === userId
                            return(
                            <tr key={i} className={me ? 'font-bold' : ''}>
                                <td>{firstPage + i+1}</td>
                                <td>{a.name}</td>
                                <td>
                                    {a.totalAsset.toLocaleString()}원
                                </td>
                                <td className={`${a.totalProfit > 0 ? 'text-red-500' : a.totalProfit < 0 ? 'text-blue-600' : ''}`}>
                                    {a.totalProfit > 0 && '+'}
                                    {a.totalProfit.toLocaleString()}원
                                </td>
                                <td className={`${a.totalProfit > 0 ? 'text-red-500' : a.totalProfit < 0 ? 'text-blue-600' : ''}`}>
                                    {a.totalProfit > 0 && '+'}
                                    {a.profitRate === 0 ? 0 : a.profitRate.toFixed(2)}%
                                </td>
                            </tr>
                        )}).slice(0, 50)}
                    </StyledTableBody>
                </StyledTable>
                {windowWidth > 530 &&
                <StyledBtns>
                    {Array.from({length: Math.ceil(safeRankgData.length / perPage)}, (_, i) => (
                        <button key={i}
                        onClick={() => setPage(i+1)}
                        className={`${page === i + 1 ? 'bg-red-500 flex items-center justify-center' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </StyledBtns>
                }
               
            </StyledBox>
        </StyledContainer>
    )
}

export default RankingComponent
