import "babel-polyfill"
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Glimpse from "./App.js"
import registerServiceWorker from "./registerServiceWorker"
import "font-awesome/css/font-awesome.min.css"

ReactDOM.render(<Glimpse />, document.getElementById("root"))
registerServiceWorker()
