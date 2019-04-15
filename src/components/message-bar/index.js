import React, { useState } from "react"
import "./style.css"

export const MessageBar = (props) => {
  return (
    <message-bar>
      <h4>{props.message}</h4>
    </message-bar>
  )
}
