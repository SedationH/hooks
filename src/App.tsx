import { useCallback, useMemo, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import AsyncFetch from "./components/async-fetch"
import SearchParams from "./components/search-params"
import "./App.css"

function App() {
  return (
    <div className="App">
      <h1>SedationH's Hooks Playground</h1>
      <nav>
        <Link to="/search-params">SearchParams</Link>
        <Link to="/async-fetch">AsyncFetch</Link>
      </nav>
      <Routes>
        <Route path="/search-params" element={<SearchParams />} />
        <Route path="/async-fetch" element={<AsyncFetch />} />
      </Routes>
    </div>
  )
}

export default App
