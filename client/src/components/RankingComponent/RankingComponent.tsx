
import { useState } from 'react'
import data from './mockupData'
import { StyledBox, StyledBtns, StyledContainer, StyledTable, StyledTableBody, StyledTableHead, StyledTitle } from './style'
const RankingComponent = () => {
    const [page, setPage] = useState<number>(1)

    const perPage = 10
    const firstPage = (page-1) * perPage
    const EachPage = data.slice(firstPage, perPage + firstPage)
 

    return (
        <StyledContainer className='compo'>
            <StyledTitle>
                <h1>랭킹</h1>
                <p>*수익률 기준</p>
            </StyledTitle>
            <StyledBox>
                <StyledTable>
                    <StyledTableHead>
                        <th className='w-[70px]'>순위</th>
                        <th className='w-[100px]'>이름</th>
                        <th>총 자산</th>
                        <th>총 손익</th>
                        <th>수익률</th>
                    </StyledTableHead>
                    <StyledTableBody>
                        {EachPage.map(a => (
                            <tr>
                                <td>{a.rank}</td>
                                <td>{a.name}</td>
                                <td>{a.totalAssets.toLocaleString()}원</td>
                                <td>{a.totalProfit.toLocaleString()}원</td>
                                <td>{a.returnRate.toFixed(2)}%</td>
                            </tr>
                        ))}
                    </StyledTableBody>
                </StyledTable>
                <StyledBtns>
                    {Array.from({length: Math.ceil(data.length / perPage)}, (_, i) => (
                        <button 
                            onClick={() => setPage(i+1)}
                            className={`${page === i + 1 ? 'bg-red-500' : ''}`}
                            >
                            {i + 1}
                        </button>
                    ))}
                </StyledBtns>
               
            </StyledBox>
        </StyledContainer>
    )
}

export default RankingComponent
