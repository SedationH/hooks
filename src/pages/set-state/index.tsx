import React, { useState } from "react"

function SetStatePage() {
  const [cnt, setCnt] = useState(0)
  return (
    <div>
      <button
        onClick={() => {
          setCnt((cnt) => cnt + 1)
          setCnt((cnt) => cnt + 2)
        }}
      >
        add
      </button>
      {cnt}
    </div>
  )
}

export default SetStatePage
