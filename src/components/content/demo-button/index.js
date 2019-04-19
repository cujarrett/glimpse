import React from "react"
import PropTypes from "prop-types"
import "./style.css"

export const DemoButton = (props) => {
  const demo = async () => {
    await props.setInput("cujarrett")
    props.handleClick()
  }

  return (
    <div name="demo-button">
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

DemoButton.propTypes = {
  setInput: PropTypes.func,
  handleClick: PropTypes.func,
  showDemo: PropTypes.bool
}
