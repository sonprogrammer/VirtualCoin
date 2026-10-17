import dayjs from 'dayjs'
import { StyledContainer, StyledTable, StyledTableBody, StyledTableHead, StyledTop } from './style'
import { useState } from 'react'
import useGetPendingCoins from '../../hooks/useGetPendingCoins'
import usePostDeleteOrder from '../../hooks/usePostDeleteOrder'

const PendingComponent = () => {
    const [selectedOrder, setSelectedOrder] = useState<Set<string>>(new Set())

    const { data = [], isLoading } = useGetPendingCoins()
    const { mutate: deleteOrder, isPending: isDeleting } = usePostDeleteOrder()

    const selectedAll = data.length > 0 && data.every(order => selectedOrder.has(order._id))


    const handleRadioChange = (orderId: string) => {
        setSelectedOrder(prev => {
            const newSet = new Set(prev)
            if (newSet.has(orderId)) {
                newSet.delete(orderId);
            } else {
                newSet.add(orderId);
            }
            return newSet
        })
    }


    //* 선택한거 삭제 
    const handleCancleClick = () => {
        const orderIds = data.filter(order => selectedOrder.has(order._id)).map(order => order._id)

        if (orderIds.length === 0 || isDeleting) return

        deleteOrder(orderIds, {
            onSuccess: () => {
                setSelectedOrder(new Set())
            }
        })
    }

    //* 개별 삭제 
    const handleCancleBtnClick = (orderId: string, e: React.MouseEvent) => {
        e.stopPropagation()

        if (isDeleting) return

        deleteOrder([orderId], {
            onSuccess: () => {
                setSelectedOrder(prev => {
                    const next = new Set(prev)
                    next.delete(orderId)
                    return next
                })
            }
        })
    }


    const handleAllClick = () => {
        if (selectedAll) {
            setSelectedOrder(new Set())
        } else {
            setSelectedOrder(new Set(data.map((o) => o._id)))
        }
    }



    return (
        <StyledContainer>
            <StyledTop>
                <p onClick={handleCancleClick}>선택 주문 취소</p>
                <p onClick={handleAllClick}>
                    {selectedAll ? '선택 해제' : '전체 선택'}
                </p>
            </StyledTop>

            <StyledTable>
                <StyledTableHead>
                    <tr>
                        <th className="w-10">선택</th>
                        <th>주문시간</th>
                        <th>코인</th>
                        <th>구분</th>
                        <th>주문가격</th>
                        <th>주문량</th>
                        <th>미체결량</th>
                        <th>관리</th>
                    </tr>
                </StyledTableHead>

                <StyledTableBody>
                    {data.map((a) => {
                        const formattedDays = dayjs(a.orderTime).format('YY.MM.DD');
                        const formattedTime = dayjs(a.orderTime).format('HH:mm');
                        const isSelected = selectedOrder.has(a._id);
                        const isBuy = a.type === 'BUY';

                        return (
                            <tr
                                key={a._id}
                                onClick={() => handleRadioChange(a._id)}
                                className={isSelected ? 'selected' : ''}
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => {
                                            handleRadioChange(a._id);
                                            e.stopPropagation();
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </td>
                                <td>
                                    <p>{formattedDays}</p>
                                    <p>{formattedTime}</p>
                                </td>
                                <td className="font-bold text-zinc-100">{a.coinKName}</td>
                                <td className={isBuy ? '!text-red-500 font-bold' : '!text-sky-400 font-bold'}>
                                    {isBuy ? '매수' : '매도'}
                                </td>
                                <td>{a.orderPrice?.toLocaleString()}</td>
                                <td>{a.orderQuantity?.toLocaleString()}</td>
                                <td className="text-zinc-500">{a.orderQuantity?.toLocaleString()}</td>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            handleCancleBtnClick(a._id, e);
                                        }}
                                    >
                                        취소
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </StyledTableBody>
            </StyledTable>

            {!isLoading && data.length === 0 && (
                <div className='flex flex-col justify-center items-center py-20'>
                    <p className='text-zinc-600 text-sm'>미체결 중인 주문이 없습니다.</p>
                </div>
            )}
        </StyledContainer>
    )
}

export default PendingComponent
