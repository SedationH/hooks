import React, { useEffect, useState } from "react"

function useEffectDemo() {
  const [data, setData] = useState<{
    hits: Array<any>
  }>({ hits: [] })
  const [query, setQuery] = useState("redux")

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
      setData(await result.json())
    }

    fetchData()
  }, [query])

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {data.hits.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default useEffectDemo
