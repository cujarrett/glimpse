import React from "react"
import "./style.css"

import { DemoButton } from "./demo-button/index.js"
import { Loading } from "./loading/index.js"
import { ShareResults } from "./share-results/index.js"
import { Timeline } from "./timeline/index.js"

export const Content = (props) => {
  return (
    <div className="content">
      <DemoButton input={props.input} setInput={props.setInput} handleClick={props.handleClick}/>
      <Loading loading={props.loading}/>
      <ShareResults input={props.input}/>
      <Timeline width={props.width} height={props.height} contributions={props.contributions}/>
    </div>
  )
}
