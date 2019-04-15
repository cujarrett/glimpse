import React from "react"
import "./style.css"

import { DemoButton } from "./demo-button/index.js"
import { Loading } from "./loading/index.js"
import { ShareResults } from "./share-results/index.js"
import { Timeline } from "./timeline/index.js"

export const Content = (props) => {
  return (
    <div className="content">
      <DemoButton setInput={props.setInput} handleClick={props.handleClick}/>
      <Loading/>
      <ShareResults input={props.input}/>
      <Timeline width={props.width} height={props.height} contributions={props.contributions}/>
    </div>
  )
}
