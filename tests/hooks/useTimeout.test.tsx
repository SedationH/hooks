import { renderHook } from "@testing-library/react"
import { useTimeout } from "../../src/hooks/useTimeout"

jest.useFakeTimers()

let fn: jest.Mock<any, any>

beforeEach(() => {
  fn = jest.fn()
})

it("can run callback after delay", () => {
  renderHook(() => useTimeout(fn, 200))

  jest.advanceTimersByTime(199)
  expect(fn).not.toHaveBeenCalled()
  jest.advanceTimersByTime(1)
  expect(fn).toHaveBeenCalled()
})

describe("DO NOT reset the timer if only callback changes", () => {
  it("delay change, reset timer", () => {
    const { rerender } = renderHook(({ fn, delay }) => useTimeout(fn, delay), {
      initialProps: {
        fn,
        delay: 200,
      },
    })
    rerender({
      fn,
      delay: 150,
    })

    jest.advanceTimersByTime(150)
    expect(fn).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("fn change, NOT reset timer", () => {
    const { rerender } = renderHook(({ fn, delay }) => useTimeout(fn, delay), {
      initialProps: {
        fn,
        delay: 200,
      },
    })
    const newFn = jest.fn()
    rerender({
      fn: newFn,
      delay: 200,
    })

    jest.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(newFn).toHaveBeenCalledTimes(0)
  })
})
