import React, { useEffect, useState } from "react"
import { useAsync } from "react-use"

const mockFetch = (id?: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`id is ${id}`)
    }, 2000)
  })
}

export default function AsyncFetch() {
  const [id, setId] = useState(0)
  const { value, loading } = useAsync(() => mockFetch(id), [id])

  return (
    <div>
      <div>id : {id}</div>
      <button onClick={() => setId(id + 1)}>addId</button>
      <hr />
      {loading ? <h2>is loading</h2> : <h2>response: {value}</h2>}
    </div>
  )
}
