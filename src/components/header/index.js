import React from "react"
import PropTypes from "prop-types"
import "./style.css"
import logo from "./glimpse-logo.png"

export const Header = (props) => {
  return (
    <header>
      <div className="app-header">
        <a href="https://glimpse.ninja"><img src={logo} className={props.logoStyling} alt="logo" /></a>
      </div>
    </header>
  )
}

Header.propTypes = {
  logoStyling: PropTypes.string
}
