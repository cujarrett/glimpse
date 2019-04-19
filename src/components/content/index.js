import React from "react"
import "./style.css"

import { DemoButton } from "./demo-button/index.js"
import { Loading } from "./loading/index.js"
import { ShareResults } from "./share-results/index.js"
import { Timeline } from "./timeline/index.js"

export const Content = (props) => {
  return (
    <div className="content">
      <DemoButton input={props.input} setInput={props.setInput} handleClick={props.handleClick} showDemo={props.showDemo}/>
      <Loading loading={props.loading}/>
      <Timeline width={props.width} height={props.height} contributions={props.contributions}/>
      <ShareResults input={props.input}/>
    </div>
  )
}
