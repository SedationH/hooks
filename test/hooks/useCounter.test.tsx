import TheReactCounter from "../../src/pages/The-React-Counter"
import { render, screen, fireEvent } from "@testing-library/react"

describe("useCounter.test", () => {
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
