import { useState } from "react"

export const useCounter = () => {
  const [cnt, setCnt] = useState(0)
  const increment = () => setCnt(cnt + 1)
  const decrement = () => setCnt(cnt - 1)

  return {
    cnt,
    increment,
    decrement,
  }
}
