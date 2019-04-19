import React from "react"
import PropTypes from "prop-types"
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
      <Timeline width={props.width} height={props.height} contributions={props.contributions} canceled={props.canceled}/>
      <ShareResults input={props.input} contributions={props.contributions}/>
    </div>
  )
}

Content.propTypes = {
  setInput: PropTypes.func,
  handleClick: PropTypes.func,
  contributions: PropTypes.array,
  input: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  showDemo: PropTypes.bool,
  loading: PropTypes.bool,
  canceled: PropTypes.bool
}
