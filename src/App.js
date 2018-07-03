import React, { Component } from "react"
import "./App.css"
import { getGitHubUserData } from "./services/github"
// Disable eslint max-len for imports from react-vis
// eslint-disable-next-line max-len
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries } from "react-vis"

class App extends Component {
  async componentDidMount() {
    const formattedData = []
    const data = await getGitHubUserData("matt-jarrett")
    const contributions = data.contributions.reverse()

    for (const contribution of contributions) {
      // Disable eslint id-length as variable names x and y are normal axis names
      // eslint-disable-next-line id-length
      formattedData.push({ x: contribution.date, y: contribution.count })
    }

    this.setState({ formattedData })
  }

  render() {
    const BarSeries = VerticalBarSeries

    return (
      <div>
        <div align="center">
          <h1>{"GitHub Contributions"}</h1>
        </div>
        { this.state && this.state.formattedData &&
      <div>
        <XYPlot
          xType="ordinal"
          width={1200}
          height={500}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries
            className="vertical-bar-series-example"
            data={ this.state.formattedData }/>
        </XYPlot>
      </div>
        }
      </div>
    )
  }
}

export default App
