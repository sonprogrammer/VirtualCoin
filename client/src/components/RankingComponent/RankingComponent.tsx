
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
    const { data, isLoading } = useGetAllUserAssetData(userId)

    const allUser = data || []
    const rankData = calculateAllUserAsset(allUser, prices)?.sort((a, b) => b.profitRate - a.profitRate)

    const safeRankgData = Array.isArray(rankData) ? rankData : [];

    // console.log('rankdat', rankData)

    // TODO 훅으로 만들어논거 가져오기
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const myRank = rankData.findIndex((data) => data.id === userId) + 1


    const perPage = 10
    const firstPage = (page - 1) * perPage
    const EachPage = safeRankgData.slice(firstPage, perPage + firstPage)

    

    return (
        <StyledContainer>
            <StyledTitle>
                <div>
                    <h1>🏆 Top 50 Leaders</h1>
                    <p>*수익률 높은 순위입니다.</p>
                </div>
                <h2>My Rank: {myRank > 0 ? `${myRank}위` : 'N/A'}</h2>
            </StyledTitle>

            {isLoading ? (
                <div className='w-full py-20 flex flex-col justify-center items-center gap-4'> 
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-zinc-500 animate-pulse text-sm">유저 자산 데이터를 분석 중...</p>
                </div>
            ) : (
                <StyledBox>
                    <StyledTable>
                        <StyledTableHead>
                            <tr>
                                <th className='w-[60px] md:w-[80px]'>순위</th>
                                <th className='text-left'>플레이어</th>
                                <th className='hidden md:table-cell'>총 자산</th>
                                <th className='text-right'>누적 손익</th>
                                <th className='text-right w-[80px] md:w-[120px]'>수익률</th>
                            </tr>
                        </StyledTableHead>
                        <StyledTableBody>
                            {(windowWidth > 530 ? EachPage : safeRankgData).slice(0, 50).map((a, i: number) => {
                                const me = a.id === userId;
                                const actualRank = firstPage + i + 1;
                                
                                const getRankDisplay = (rank: number) => {
                                    if (rank === 1) return <span className="rank-badge bg-yellow-500 text-black">1</span>;
                                    if (rank === 2) return <span className="rank-badge bg-zinc-400 text-black">2</span>;
                                    if (rank === 3) return <span className="rank-badge bg-orange-700 text-white">3</span>;
                                    return rank;
                                };

                                return (
                                    <tr key={a.id || i} className={me ? 'me' : ''}>
                                        <td>{getRankDisplay(actualRank)}</td>
                                        <td className="text-left font-sans">
                                            <span className="font-bold">{a.name}</span>
                                            {me && <span className="ml-2 text-[10px] bg-red-600 text-white px-1 rounded">YOU</span>}
                                        </td>
                                        <td className="hidden md:table-cell text-zinc-400">
                                            ₩{Math.round(Number(a.totalAsset))?.toLocaleString()}
                                        </td>
                                        <td className={`text-right ${a.totalProfit > 0 ? 'text-red-500' : a.totalProfit < 0 ? 'text-blue-500' : 'text-zinc-500'}`}>
                                            {a.totalProfit > 0 && '+'}{Math.round(Number(a.totalProfit))?.toLocaleString()}
                                        </td>
                                        <td className={`text-right font-bold ${a.totalProfit > 0 ? 'text-red-500' : a.totalProfit < 0 ? 'text-blue-500' : 'text-zinc-500'}`}>
                                            {a.totalProfit > 0 && '+'}{(a.profitRate || 0).toFixed(2)}%
                                        </td>
                                    </tr>
                                )
                            })}
                        </StyledTableBody>
                    </StyledTable>

                    {windowWidth > 530 && safeRankgData.length > perPage && (
                        <StyledBtns>
                            {Array.from({ length: Math.ceil(Math.min(safeRankgData.length, 50) / perPage) }, (_, i) => (
                                <button key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={page === i + 1 ? 'active' : ''}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </StyledBtns>
                    )}
                </StyledBox>
            )}
        </StyledContainer>
    )
}

export default RankingComponent
