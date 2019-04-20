import React from "react"
import PropTypes from "prop-types"
import "./style.css"
import loading from "./loading.svg"

export const Loading = (props) => {
  return (
    <div name="loading">
      { props.loading &&
      <div className="lowered-content">
        <img src={loading} alt="loading" />
      </div>
      }
    </div>
  )
}

Loading.propTypes = {
  loading: PropTypes.bool
}
