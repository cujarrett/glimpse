import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Glimpse from "./App.js"
import reportWebVitals from "./report-web-vitals.js"
import "font-awesome/css/font-awesome.min.css"

ReactDOM.render(
  <React.StrictMode>
    <Glimpse />
  </React.StrictMode>,
  document.getElementById("root")
)
reportWebVitals()
