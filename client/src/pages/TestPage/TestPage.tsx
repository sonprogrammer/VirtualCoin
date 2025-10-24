import React, { useEffect, useState } from 'react'
import useWebSocket from '../../hooks/useWebSocket'
import { useRecoilState } from 'recoil';
import { CoinPrice } from '../../context/CoinPrice';
import axios from 'axios';

export const TestPage = () => {
  const prices = useWebSocket()

  console.log('prices', prices)
  const coins = Object.keys(prices)
  // console.log('rerendering')


  // const price = prices['KRW-ETH']
  // console.log('dfad',coins)
  // console.log('dfad',prices)
  return (
    <div>
       {coins.map(market => {
        const data = prices[market];
        return (
          <div key={market} className="flex gap-10">
            <span>{market}daa</span>
            <span>{data.trade_price?.toLocaleString()}</span>
            <span>{(data.change_rate * 100).toFixed(2)}%</span>
          </div>
        )
      })}
    </div>
  )
}


