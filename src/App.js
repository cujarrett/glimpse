import React, { Component } from "react"
import "./App.css"
import { getGitHubUserData } from "./services/github"
import logo from "./glimpse-logo.png"
// Disable eslint max-len for imports from react-vis
// eslint-disable-next-line max-len
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries } from "react-vis"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  async componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)

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

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: .98 * (window.innerWidth), height: .88 * (window.innerHeight) })
  }

  render() {
    const BarSeries = VerticalBarSeries

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          { this.state && this.state.formattedData &&
      <div>
        <XYPlot
          xType="ordinal"
          width={this.state.width}
          height={this.state.height}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries
            color="purple"
            className="vertical-bar-series-example"
            data={ this.state.formattedData }/>
        </XYPlot>
      </div>
          }
        </div>
      </div>
    )
  }
}

export default App
