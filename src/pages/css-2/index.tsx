import "./style.less"

function index() {
  return (
    <div className="css-2">
      <div className="one-line">
        So, having the pseudos take the fully-collapsible rows allows the auto-placement algorithm to work its magic on
        our actual elements, except if we need to support IE, which lacks auto-placement. Which, leads us to the next
        method…
      </div>

      <hr />

      <div className="multi-line">
        So, having the pseudos take the fully-collapsible rows allows the auto-placement algorithm to work its magic on
        our actual elements, except if we need to support IE, which lacks auto-placement. Which, leads us to the next
        method…
      </div>
    </div>
  )
}

export default index
