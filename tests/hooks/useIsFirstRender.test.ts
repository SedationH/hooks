import { renderHook } from "@testing-library/react"
import { useIsFirstRender } from "../../src/hooks/useIsFirstRender"

test("first render return true else false", () => {
  const { result, rerender } = renderHook(() => useIsFirstRender())
  expect(result.current).toBe(true)
  rerender()
  expect(result.current).toBe(false)
})
