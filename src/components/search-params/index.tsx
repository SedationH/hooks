import { useMemo, useState } from "react"

const useSearchParams = () => {
  const searchParams = useMemo(() => {
    return new URLSearchParams(window.location.search)
  }, [location.search])

  const setSearchParams = (nextInit: string) => {
    const url = new URL("" + window.location) // toString
    url.search = `?${nextInit}`
    window.history.pushState({}, "", url)
  }

  return [searchParams, setSearchParams] as const
}

function SearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [name, setName] = useState(searchParams.get("name") || "")
  const [age, setAge] = useState(searchParams.get("age") || "")
  const [linkArr, setLinkArr] = useState<string[]>([])

  return (
    <div className="component">
      {/* TODO: 需要套个节流函数 */}
      <h2>Search</h2>
      <div>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setSearchParams(`age=${age}&name=${name}`)
          }}
        />
      </div>
      <div>
        Age:{" "}
        <input
          type="text"
          value={age}
          onChange={(e) => {
            setAge(e.target.value)
            setSearchParams(`age=${age}&name=${name}`)
          }}
        />
      </div>
      <button onClick={() => setLinkArr(linkArr.concat(`?age=${age}&name=${name}`))}>save link</button>
      <button onClick={() => setSearchParams(`age=${age}&name=${name}`)}>setSearchParams</button>
      <ul>
        {linkArr.map((link) => (
          <li key={link}>
            <a href={link}>link：{link}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchParams
