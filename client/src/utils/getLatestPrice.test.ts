import { describe, expect, it } from "vitest"
import { getLatestPrice } from "./getLatestPrice"
import type { PriceData } from "../hooks/useWebSocket"

const createPrice = (trade_price: number, timestamp: number): PriceData => ({
  trade_price,
  timestamp,
  change_rate: 0,
  acc_price: 0,
  change_price: 0,
  trade_volume: 0,
  high_price: 0,
  low_price: 0,
  prev_closing_price: 0
})

describe("getLatestPrice", () => {
  it("기존 데이터가 없으면 새 데이터를 반환한다", () => {
    const incoming = createPrice(1200, 200)

    expect(getLatestPrice(undefined, incoming)).toBe(incoming)
  })

  it("새 데이터의 timestamp가 더 크면 새 데이터를 반환한다", () => {
    const current = createPrice(1100, 100)
    const incoming = createPrice(1200, 200)

    expect(getLatestPrice(current, incoming)).toBe(incoming)
  })

  it("기존 데이터의 timestamp가 더 크면 기존 데이터를 유지한다", () => {
    const current = createPrice(1300, 300)
    const incoming = createPrice(1200, 200)

    expect(getLatestPrice(current, incoming)).toBe(current)
  })

  it("timestamp가 같으면 기존 데이터를 유지한다", () => {
    const current = createPrice(1100, 200)
    const incoming = createPrice(1200, 200)

    expect(getLatestPrice(current, incoming)).toBe(current)
  })
})