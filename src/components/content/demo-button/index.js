import React from "react"
import "./style.css"

export const DemoButton = (props) => {
  const demo = async () => {
    console.log(`props.input: ${props.input}`)
    await props.setInput("cujarrett")
    console.log(`props.input: ${props.input}`)
    props.handleClick()
  }

  return (
    <div name="show-demo">
      { props.showDemo &&
      <div className="lowered-content">
        <h4>
          <button type="button" className="clickable" onClick={demo}>
            Show me a demo
          </button>
        </h4>
      </div>
      }
    </div>
  )
}
