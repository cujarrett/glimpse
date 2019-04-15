import React from "react"
import "./style.css"

export const DemoButton = (props) => {
  const demo = async () => {
    props.setInput("cujarrett")
    props.handleClick()
  }

  return (
    <div className="lowered-content">
      <h4>
        <button type="button" className="clickable" onClick={demo}>
          Show me a demo
        </button>
      </h4>
    </div>
  )
}
