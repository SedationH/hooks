import React, { useEffect, useState } from "react"

const mockFetch = (id?: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`id is ${id}`)
    }, 2000)
  })
}

export default function AsyncFetch() {
  const [id, setId] = useState(0)
  const [response, setResponse] = useState<string>("")

  useEffect(() => {
    mockFetch(id).then(setResponse)
  }, [id])

  return (
    <div>
      <div>id : {id}</div>
      <button onClick={() => setId(id + 1)}>addId</button>
      <hr />
      response: {response}
    </div>
  )
}
