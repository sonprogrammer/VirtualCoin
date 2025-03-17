
import { useEffect, useState } from 'react'
import { StyledBox, StyledBtns, StyledContainer, StyledTable, StyledTableBody, StyledTableHead, StyledTitle } from './style'
import useGetRankData from '../../hooks/useGetRankData'

const RankingComponent = () => {
    const [page, setPage] = useState<number>(1)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    const {rankingData} = useGetRankData() || { rankingData: [] };

    const safeRankingData = Array.isArray(rankingData) ? rankingData : [];

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    },[])

    const perPage = 10
    const firstPage = (page-1) * perPage
    const EachPage = safeRankingData.slice(firstPage, perPage + firstPage)
 

    return (
        <StyledContainer className='compo'>
            <StyledTitle>
                <h1>랭킹 50</h1>
                <p>*수익률 기준</p>
                {/* //TODO 내랭킹도 적어놓기 오른쪽 끝에 */}
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
                        {( windowWidth > 530 ? EachPage : safeRankingData).map((a:any, i:number) => (
                            <tr key={i}>
                                <td>{firstPage + i+1}</td>
                                <td>{a.name}</td>
                                <td>{a.totalAssets.toLocaleString()}원</td>
                                <td>{a.totalAssets.toLocaleString()}원</td>
                                <td>{a.totalAssets.toFixed(2)}%</td>
                            </tr>
                        ))}
                    </StyledTableBody>
                </StyledTable>
                {windowWidth > 530 &&
                <StyledBtns>
                    {Array.from({length: Math.ceil(safeRankingData.length / perPage)}, (_, i) => (
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
