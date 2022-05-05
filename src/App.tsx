import { useCallback, useMemo, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import SearchParams from "./components/search-params"

function App() {
  return (
    <div className="App">
      <h1>SedationH's Hooks Playground</h1>
      <Link to="/search-params">SearchParams</Link>
      <Routes>
        <Route path="/search-params" element={<SearchParams />} />
      </Routes>
    </div>
  )
}

export default App
