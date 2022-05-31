import { useEffect, useRef } from "react"

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const current = callbackRef.current
    const timer = setTimeout(current, delay)
    return () => clearTimeout(timer)
  }, [delay])
}
