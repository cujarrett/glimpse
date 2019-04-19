import React from "react"
import PropTypes from "prop-types"
import "./style.css"

export const MessageBar = (props) => {
  return (
    <message-bar>
      <h4>{props.message}</h4>
    </message-bar>
  )
}

MessageBar.propTypes = {
  message: PropTypes.string
}
