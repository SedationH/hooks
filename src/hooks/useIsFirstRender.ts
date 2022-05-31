import { useRef } from "react"

export function useIsFirstRender(): boolean {
  const isFirstRenderRef = useRef(true)

  if (isFirstRenderRef.current) {
    isFirstRenderRef.current = false
    return true
  }

  return false
}
