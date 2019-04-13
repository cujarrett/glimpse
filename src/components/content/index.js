import React from "react"
import "./style.css"

import { DemoButton } from "./demo-button/index.js"
import { Loading } from "./loading/index.js"
import { ShareResults } from "./share-results/index.js"
import { Timeline } from "./timeline/index.js"

export const Content = () => {
  return (
    <div className="content">
      <DemoButton/>
      <Loading/>
      <ShareResults/>
      <Timeline/>
    </div>
  )
}
