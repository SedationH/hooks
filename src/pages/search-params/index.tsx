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
  const [isSync, setIsSync] = useState(true)

  return (
    <div className="component">
      <h2>Search</h2>
      <div>当前同步状态: {isSync ? "同步" : "非同步"}</div>
      <div>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={({ target: { value: newName } }) => {
            setName(newName)
            isSync && setSearchParams(`age=${age}&name=${newName}`)
          }}
        />
      </div>
      <div>
        Age:{" "}
        <input
          type="text"
          value={age}
          onChange={({ target: { value: newAge } }) => {
            setAge(newAge)
            isSync && setSearchParams(`age=${newAge}&name=${name}`)
          }}
        />
      </div>
      <button onClick={() => setLinkArr(linkArr.concat(`?age=${age}&name=${name}`))}>save link</button>
      <button onClick={() => setIsSync(!isSync)}>{isSync ? "Close" : "Open"} Sync</button>
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
