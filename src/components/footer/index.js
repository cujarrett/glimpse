import React from "react"
import PropTypes from "prop-types"
import "./style.css"

export const Footer = (props) => {
  return (
    <div className={props.footerStyling}>
      <h4>
        Made with <i className="fa fa-heart"/>, JavaScript, and <i className="fa fa-github"/>
      </h4>
    </div>
  )
}

Footer.propTypes = {
  footerStyling: PropTypes.string
}
