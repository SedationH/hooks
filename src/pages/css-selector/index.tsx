import "./style.less"

function index() {
  return (
    <div className="css-selector">
      <h1>selector</h1>
      <hr />
      <ul>
        <li>One</li>
        <li>Two!</li>
        <li>
          Three li
          <span>this is span</span>
        </li>
      </ul>
    </div>
  )
}

export default index
