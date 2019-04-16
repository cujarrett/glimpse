import React from "react"
import "./style.css"
import loading from "./loading.svg"

export const Loading = (props) => {
  return (
    <div className="lowered-content">
    { props.loading &&
      <img src={loading} alt="loading" />
    }
    </div>
  )
}
