import React from "react"
import "./style.css"
import loading from "./loading.svg"

export const Loading = () => {
  return (
    <div className="lowered-content">
      <img src={loading} alt="loading" />
    </div>
  )
}
