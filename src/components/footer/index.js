import React from "react"
import PropTypes from "prop-types"
import "./style.css"
import { version } from "../../../package.json"

export const Footer = (props) => {
  return (
    <div className={props.footerStyling} data-testid="footer">
      <h4>
        Made by{" "}
        <a href="https://cujarrett.dev">
          @cujarrett
        </a>{" "}
        with <i className="fa fa-heart" /> and JavaScript
      </h4>
      <div className="version">
        <a href="https://github.com/cujarrett/glimpse/blob/main/CHANGELOG.md">{version}</a>
      </div>
    </div>
  )
}

Footer.propTypes = {
  footerStyling: PropTypes.string
}
