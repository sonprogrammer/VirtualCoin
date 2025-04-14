import { useState } from 'react'
import { StyledBody, StyledContainer, StyledDate, StyledDetail, StyledHead, StyledPeriodAndType, StyledPeriodBurgerMenu, StyledSelect, StyledTable, StyledTableContainer, StyledTypeMenu } from './style'
import useGetTransaction from '../../hooks/useGetTransaction'
import { userState } from '../../context/userState'
import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'


const TransactionComponent = () => {

    const [type, setType] = useState<'매도' | '매수' | '전체'>('전체')
    const [period, setPeriod] = useState<'1주일' | '1개월' | '6개월' | '전체'>('전체');
    const [showPeriodMenu, setShowPeriodMenu] = useState<boolean>(false);
    const [showTypeMenu, setShowTypeMenu] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

    const user = useRecoilValue(userState);
    const userId = user._id

    const { data, isLoading, error } = useGetTransaction(userId);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    const coins = data?.coins
    
 
    
const formatDateTime = (dateString: string) => {
    return dayjs(dateString).format('YY.MM.DD HH:mm');
};
    
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}.${month}.${day}`
    }

    const handlePeriodClick = () => {
        setShowPeriodMenu(prev => !prev);
        setShowTypeMenu(false);
    };

    const handleTypeClick = () => {
        setShowTypeMenu(prev => !prev);
        setShowPeriodMenu(false);
    };

    const handlePeriodSelect = (selectedPeriod: '1주일' | '1개월' | '6개월' | '전체') => {
        setPeriod(selectedPeriod)
        setShowPeriodMenu(false)
        setStartDate('')
        setEndDate('')

        const now = new Date();

        let startingDate: Date = new Date(now)
        let endingDate: Date = new Date(now)

        if (selectedPeriod === '1주일') {
            startingDate.setDate(now.getDate() - 7)
        } else if (selectedPeriod === '1개월') {
            startingDate.setMonth(now.getMonth() - 1)
        } else if (selectedPeriod === '6개월') {
            startingDate.setMonth(now.getMonth() - 6)
        } else {
            setStartDate('.....')
            setEndDate(formatDate(now))
            return
        }
        setStartDate(formatDate(startingDate))
        endingDate.setHours(now.getHours() + 23)
        setEndDate(formatDate(endingDate))
    }
    
    const handleTypeSelect = (selectedType: '매도' | '매수' | '전체') => {
        setType(selectedType)
        setShowTypeMenu(false)
    }
    
    const filterByPeriod = (transactionTime: string) => {
        if (period === '전체') return true;
        if (!startDate || !endDate) return false;
        
        const transactionDate = new Date(transactionTime);
        return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
    };
    
    const filteredData = coins?.filter((item:any) => {
        const periodMatch = filterByPeriod((item.completedTime));
        const typeMatch = type === '전체' || item.type === (type === '매수' ? 'BUY' : 'SELL');
        return periodMatch && typeMatch;
    });

    return (

        <StyledContainer>

            <StyledPeriodAndType>
                <StyledDetail>
                    <StyledSelect>
                        <div className='flex'>

                        <h2 className='hover:bg-blue-700 hover:text-white' onClick={handlePeriodClick}>기간</h2>
                        <h2 className='hover:bg-green-700 hover:text-white' onClick={handleTypeClick}>거래유형</h2>
                        </div>
                        <div>

                        {showPeriodMenu &&
                            <StyledPeriodBurgerMenu>
                                <p onClick={() => handlePeriodSelect('1주일')}>1주일</p>
                                <p onClick={() => handlePeriodSelect('1개월')}>1개월</p>
                                <p onClick={() => handlePeriodSelect('6개월')}>6개월</p>
                                <p onClick={() => handlePeriodSelect('전체')}>전체</p>
                            </StyledPeriodBurgerMenu>
                        }
                        {showTypeMenu &&
                            <StyledTypeMenu>
                                <p onClick={() => handleTypeSelect('매수')}>매수</p>
                                <p onClick={() => handleTypeSelect('매도')}>매도</p>
                                <p onClick={() => handleTypeSelect('전체')}>전체</p>
                            </StyledTypeMenu>
                        }
                        </div>
                    </StyledSelect>
                    <h1 
                        
                    onClick={() => { handlePeriodSelect('전체'); handleTypeSelect('전체') }}>전체</h1>
                </StyledDetail>

                <StyledDate>
                    <h3>{`${period === '전체' ? '모든기간' : period}`} | {startDate && endDate && `${startDate} ~ ${endDate}`}</h3>
                    <h3>{type}</h3>
                </StyledDate>
            </StyledPeriodAndType>

            <StyledTableContainer>
                <StyledTable>
                    <StyledHead>
                        <tr>
                            <th>체결시간</th>
                            <th>코인명</th>
                            <th className='w-[44px]'>종류</th>
                            <th>거래수량</th>
                            <th>거래단가</th>
                            <th>거래금액</th>
                            <th>주문시간</th>
                        </tr>
                    </StyledHead>
                    <StyledBody>
                        {
                            filteredData?.map((a: any, i:number) => {
                                const totalCost = Math.floor(a.amount * a.price)

                                return(
                                <tr key={i}>
                                    <td>{formatDateTime(a.completedTime)}</td>
                                    <td>{a.kName}</td>
                                    <td
                                        className={`${a.type === 'SELL' ? 'text-blue-700' : 'text-red-500'}`}
                                    >{a.type === 'BUY' ? '매수' : '매도'}</td>
                                    <td>{a.amount.toFixed(3)}</td>
                                    <td>{a.price.toLocaleString()}</td>
                                    <td>{totalCost.toLocaleString()}</td>
                                    <td>{formatDateTime(a.orderTime)}</td>
                                </tr>
                            )})
                        }
                    </StyledBody>
                </StyledTable>
            </StyledTableContainer>
        </StyledContainer>
    )
}

export default TransactionComponent
