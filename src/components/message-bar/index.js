import React from "react"
import PropTypes from "prop-types"
import "./style.css"

export const MessageBar = (props) => {
  if (props.contributions.length > 0) {
    const userGitHubUrl = `https://github.com/${props.input}`
    const startOfMessage = props.message.substring(0, props.message.indexOf("at") + 3)
    const endOfMessage = props.message.substring(props.message.indexOf("GitHub") - 3)
    const userName = props.input
    return (
      <div data-testid="message">
        <h4>{startOfMessage}<a href={userGitHubUrl} target="_blank" rel="noopener noreferrer">{userName}</a>{endOfMessage}</h4>
      </div>
    )
  } else {
    return (
      <div data-testid="message">
        <h4 id="message">{props.message}</h4>
      </div>
    )
  }
}

MessageBar.propTypes = {
  message: PropTypes.string,
  contributions: PropTypes.array,
  input: PropTypes.string
}
