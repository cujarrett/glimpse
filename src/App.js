import React, { Component } from "react"
import "./App.css"
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from "react-vis"

class App extends Component {
  render() {
    return (
      /* eslint-disable id-length */
      <XYPlot
        width={300}
        height={300}>
        <HorizontalGridLines />
        <LineSeries
          data={[
            { x: 1, y: 10 },
            { x: 2, y: 5 },
            { x: 3, y: 15 }
          ]}/>
        <XAxis />
        <YAxis />
      </XYPlot>
    )
    /* eslint-enable id-length */
  }
}

export default App
