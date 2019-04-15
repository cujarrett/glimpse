import React from "react"
import "./style.css"
import logo from "./glimpse-logo.png"

export const Header = (props) => {
  return (
    <header>
      <div className="github-link">
        <a href="https://github.com/cujarrett/glimpse"><i className="fa fa-star"/> on GitHub</a>
      </div>
      <div className="app-header">
        <a href="https://glimpse.ninja"><img src={logo} className={props.logoStyling} alt="logo" /></a>
      </div>
    </header>
  )
}
