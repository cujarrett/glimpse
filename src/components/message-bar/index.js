import React from "react"
import PropTypes from "prop-types"
import "./style.css"

export const MessageBar = (props) => {
  if (props.contributions.length > 0) {
    const userGitHubUrl = `https://github.com/${props.input}`
    return (
      <message-bar>
        <h4>A glimpse at <a href={userGitHubUrl} target="_blank">{props.input}</a>'s GitHub contributions</h4>
      </message-bar>
    )
  } else {
    return (
      <message-bar>
        <h4>{props.message}</h4>
      </message-bar>
    )
  }
}

MessageBar.propTypes = {
  message: PropTypes.string,
  contributions: PropTypes.array,
  input: PropTypes.string
}
