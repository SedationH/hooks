import { Link, useRoutes } from "react-router-dom"
import "./App.css"
import routes from "~react-pages"

function App() {
  const Routes = useRoutes(routes)

  return (
    <div className="App">
      {/* <h1>SedationH's Playground</h1> */}
      <nav>
        {routes.map(({ path = "" }) => (
          <Link to={path}>{path}</Link>
        ))}
      </nav>
      {Routes}
    </div>
  )
}

export default App
