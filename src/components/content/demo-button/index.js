import React from "react"
import "./style.css"

export const DemoButton = () => {
  return (
    <div className="lowered-content">
      <h4>
        <button type="button" className="clickable" onClick={this.demo}>
          {this.state.demoMessage}
        </button>
      </h4>
    </div>
  )
}
