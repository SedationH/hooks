import { sleep } from "../../src/utils/sleep"

jest.useFakeTimers()

test("wait for 1000ms time", async () => {
  const doSomething = jest.fn()

  sleep(1000).then(() => {
    doSomething()
  })

  jest.advanceTimersByTime(999)
  await Promise.resolve()
  expect(doSomething).not.toHaveBeenCalled()

  jest.advanceTimersByTime(1)
  await Promise.resolve()
  expect(doSomething).toHaveBeenCalled()
})
