import { PriceData } from "../hooks/useWebSocket"


export const getLatestPrice = (current: PriceData | undefined, newPrice: PriceData): PriceData => {
  if (!current) return newPrice

  return newPrice.timestamp > current.timestamp ? newPrice : current
}