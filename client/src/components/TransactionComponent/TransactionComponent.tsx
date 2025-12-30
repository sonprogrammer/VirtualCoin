import { useState } from 'react'
import { StyledBody, StyledContainer, StyledDate, StyledDetail, StyledHead, StyledPeriodAndType, StyledPeriodBurgerMenu, StyledSelect, StyledTable, StyledTableContainer, StyledTypeMenu } from './style'
import useGetTransaction from '../../hooks/useGetTransaction'
import { userState } from '../../context/userState'
import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'
import Skeleton from '@mui/material/Skeleton'


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

    if (isLoading) {
        return (
            <div className='p-6 space-y-4'>
                <Skeleton variant='rectangular' height={40} sx={{ bgcolor: '#18181b', borderRadius: '8px' }} />
                <Skeleton variant='rectangular' height={300} sx={{ bgcolor: '#18181b', borderRadius: '8px' }} />
            </div>
        )
    }
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
                        <div className='flex gap-2'>
                            <h2 onClick={handlePeriodClick}>기간 설정</h2>
                            <h2 onClick={handleTypeClick}>거래 유형</h2>
                        </div>
                        
                        {showPeriodMenu && (
                            <StyledPeriodBurgerMenu>
                                {(['1주일', '1개월', '6개월', '전체'] as const).map(p => (
                                    <p key={p} onClick={() => handlePeriodSelect(p)}>{p}</p>
                                ))}
                            </StyledPeriodBurgerMenu>
                        )}
                        {showTypeMenu && (
                            <StyledTypeMenu>
                                {(['매수', '매도', '전체'] as const).map(t => (
                                    <p key={t} onClick={() => handleTypeSelect(t)}>{t}</p>
                                ))}
                            </StyledTypeMenu>
                        )}
                    </StyledSelect>
                    
                    <h1 onClick={() => { handlePeriodSelect('전체'); handleTypeSelect('전체') }}>
                        초기화
                    </h1>
                </StyledDetail>

                <StyledDate>
                    <h3>기간: {period === '전체' ? '모든 기간' : `${startDate} ~ ${endDate}`}</h3>
                    <h3>유형: {type}</h3>
                </StyledDate>
            </StyledPeriodAndType>

            <StyledTableContainer>
                <StyledTable>
                    <StyledHead>
                        <tr>
                            <th className='w-[15%]'>체결시간</th>
                            <th>코인</th>
                            <th className='w-[60px]'>종류</th>
                            <th>거래수량</th>
                            <th>단가</th>
                            <th>거래금액</th>
                            <th className='w-[15%]'>주문시간</th>
                        </tr>
                    </StyledHead>
                    <StyledBody>
                        {filteredData?.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-20 text-zinc-600">거래 내역이 없습니다.</td>
                            </tr>
                        ) : (
                            filteredData?.map((a: any, i: number) => {
                                const isBuy = a.type === 'BUY';
                                const totalCost = Math.floor(a.amount * a.price);

                                return (
                                    <tr key={i}>
                                        <td>{formatDateTime(a.completedTime)}</td>
                                        <td className="font-bold text-zinc-100">{a.kName}</td>
                                        <td className={isBuy ? '!text-red-500 font-bold' : '!text-sky-400 font-bold'}>
                                            {isBuy ? '매수' : '매도'}
                                        </td>
                                        <td>{a.amount.toFixed(3)}</td>
                                        <td>{a.price?.toLocaleString()}</td>
                                        <td className="text-zinc-100">{totalCost?.toLocaleString()}</td>
                                        <td>{formatDateTime(a.orderTime)}</td>
                                    </tr>
                                )
                            })
                        )}
                    </StyledBody>
                </StyledTable>
            </StyledTableContainer>
        </StyledContainer>
    )
}

export default TransactionComponent
