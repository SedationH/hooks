import { useEffect, useRef } from "react"

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const timer = setTimeout(() => callbackRef.current(), delay)
    return () => {
      clearTimeout(timer)
    }
  }, [delay])
}
