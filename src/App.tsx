import { useMemo, useRef, useState } from "react"

const useSearchParams = () => {
  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search)
  }, [location.search])

  return [searchParams]
}

function App() {
  const [searchParams] = useSearchParams()
  const [name, setName] = useState(searchParams.get("name") || "")
  const [age, setAge] = useState(searchParams.get("age") || "")
  const [linkArr, setLinkArr] = useState<string[]>([])

  return (
    <div className="App">
      <h1>Search</h1>
      <div>
        Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        Age: <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <button onClick={() => setLinkArr(linkArr.concat(`/?age=${age}&name=${name}`))}>save link</button>
      <ul>
        {linkArr.map((link) => (
          <li>
            <a href={link}>link：{link}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
