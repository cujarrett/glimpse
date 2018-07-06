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
    this.state = {
      width: 0,
      height: 0,
      message: "",
      inputValue: "",
      formattedData: []
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount = async () => {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: .8 * (window.innerWidth), height: .6 * (window.innerHeight) })
  }

  updateInputValue = (event) => {
    this.setState({
      inputValue: event.target.value,
      formattedData: [],
      message: ""
    })
  }

  handleClick = async () => {
    this.setState({
      message: `Searching ${this.state.inputValue}'s GitHub contributions...`
    })
    const formattedData = []
    const data = await getGitHubUserData(this.state.inputValue)
    const contributions = data.contributions.reverse()

    for (const contribution of contributions) {
      // Disable eslint id-length as variable names x and y are normal axis names
      // eslint-disable-next-line id-length
      formattedData.push({ x: contribution.date, y: contribution.count })
    }

    this.setState({
      formattedData,
      message: `A glimpse at ${this.state.inputValue}'s GitHub contributions`
    })
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleClick()
    }
  }

  render = () => {
    const BarSeries = VerticalBarSeries

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          <input value={this.state.inputValue}
            onChange={(event) => this.updateInputValue(event)}
            onKeyPress={this.handleKeyPress}
          />
          <button onClick={(event) => this.handleClick(event)}>Search</button>
          <h2>{this.state.message}</h2>
        </div>
        { this.state && this.state.formattedData &&
          <div className="Content">
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
    )
  }
}

export default App
