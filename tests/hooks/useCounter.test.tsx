import TheReactCounter from "../../src/pages/The-React-Counter"
import { render, screen, fireEvent, renderHook, act } from "@testing-library/react"
import { useCounter } from "../../src/hooks/useCounter"

describe("useCounter user view", () => {
  it("able to increment and decrement", async () => {
    render(<TheReactCounter />)

    await screen.findByText("clicked: 0")

    const incrementButton = await screen.findByTestId("increment-button")
    const decrementButton = await screen.findByTestId("decrement-button")

    // increment
    fireEvent.click(incrementButton)
    await screen.findByText("clicked: 1")
    fireEvent.click(incrementButton)
    await screen.findByText("clicked: 2")

    // decrement
    fireEvent.click(decrementButton)
    await screen.findByText("clicked: 1")
    fireEvent.click(decrementButton)
    await screen.findByText("clicked: 0")
  })
})

describe("useCounter developer view", () => {
  it("able to increment and decrement", async () => {
    const result = renderHook(() => useCounter())
    expect(result.result.current.cnt).toBe(0)
    act(() => {
      result.result.current.decrement()
    })
    expect(result.result.current.cnt).toBe(-1)

    act(() => {
      result.result.current.increment()
    })
    expect(result.result.current.cnt).toBe(0)
  })
})
