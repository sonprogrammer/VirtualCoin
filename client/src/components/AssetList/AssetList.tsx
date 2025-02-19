
import data from './mockupData'
import { StyledContainer, StyledImage, StyledTable, StyledTableBody, StyledTableHead, StyledTableTr } from './style';


const AssetList = () => {


    return (
        <StyledContainer className='listContainer'>
            <StyledTable>
                <StyledTableHead>
                    <th>보유자산</th>
                    <th>보유수량</th>
                    <th>매수평군가</th>
                    <th>평가금액</th>
                    <th>평가손익(%)</th>
                </StyledTableHead>
                <StyledTableBody>
                    {data.map((coin) => {
                        const evaluationAmount = coin.quantity * coin.currentPrice;
                        const profitLoss = evaluationAmount - (coin.quantity * coin.averageBuyPrice);
                        const profitLossPercentage = ((profitLoss / (coin.quantity * coin.averageBuyPrice)) * 100).toFixed(2);

                        return (

                            <StyledTableTr key={coin.id}>
                                <td>
                                    <StyledImage>
                                        <img src={coin.coinImage} alt="코인이미지" />
                                        <p>{coin.coinName}</p>
                                    </StyledImage>
                                </td>
                                <td>{coin.quantity}</td>

                                <td>{coin.averageBuyPrice.toLocaleString()}KRW</td>
                                <td>{coin.currentPrice.toLocaleString()}KRW</td>
                                <td>
                                    <div>
                                        <p
                                            className={`${Number(profitLossPercentage) < 0 ? 'text-blue-600' : 'text-red-500'}`}
                                        >
                                            {Number(profitLossPercentage) > 0 && '+'}
                                            {profitLossPercentage}%</p>
                                        <p
                                            className={`${Number(profitLossPercentage) < 0 ? 'text-blue-600' : 'text-red-500'}`}
                                        >{profitLoss.toLocaleString()}KRW</p>
                                    </div>
                                </td>

                            </StyledTableTr>
                        )
                    })}
                </StyledTableBody>
            </StyledTable>
        </StyledContainer>
    )
}

export default AssetList
