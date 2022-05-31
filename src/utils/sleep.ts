export const sleep = (ms = 200) =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve()
    }, ms)
  )
