import React, { Component } from "react"
import "./App.css"
import { getGitHubUserData } from "./services/github"
import logo from "./glimpse-logo.png"
import loading from "./loading.gif"
import queryString from "query-string"
// Disable eslint max-len for imports from react-vis
// eslint-disable-next-line max-len
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries } from "react-vis"

const defaultMessage = "Search any GitHub username for a glimpse at their open source contributions"
const defaultDemoMessage = "Show me a demo"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
      canceled: false,
      usernameInUrl: false,
      loading: false,
      showDemo: true,
      inputValue: "",
      formattedData: [],
      legend: [],
      message: defaultMessage,
      demoMessage: defaultDemoMessage
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount = async () => {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)

    const urlArguments = queryString.parse(window.location.search)
    const hasUrlArguments = Object.keys(urlArguments).length !== 0
    if (hasUrlArguments) {
      await this.setState({ inputValue: urlArguments.username })
      window.history.pushState("", "Glimpse", "/")
      this.handleClick()
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({
      width: .90 * (window.innerWidth),
      height: .55 * (window.innerHeight - 20)
    })
  }

  updateInputValue = (event) => {
    this.setState({
      canceled: true,
      inputValue: event.target.value,
      formattedData: [],
      message: defaultMessage
    })
  }

  handleClick = async () => {
    if (this.state.inputValue !== "") {
      this.setState({
        canceled: false,
        loading: true,
        formattedData: [],
        legend: [],
        message: `Searching ${this.state.inputValue}'s GitHub contributions...`,
        demoMessage: ""
      })
      const contributions = await getGitHubUserData(this.state.inputValue)

      if (contributions.length === 0) {
        if (!this.state.canceled) {
          this.setState({
            loading: false,
            formattedData: [],
            legend: [],
            message: `No GitHub contributions found for ${this.state.inputValue}`,
            demoMessage: defaultDemoMessage
          })
        }
      } else {
        if (!this.state.canceled) {
          this.setState({
            loading: false,
            formattedData: contributions,
            legend: [],
            message: `A glimpse at ${this.state.inputValue}'s GitHub contributions`,
            showDemo: false
          })
        }
      }
    } else {
      this.setState({
        loading: false,
        formattedData: [],
        legend: [],
        message: "You searched for an empty username  ¯\\_(ツ)_/¯",
        demoMessage: defaultDemoMessage
      })
    }
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleClick()
    }
  }

  demo = async () => {
    await this.setState({
      inputValue: "matt-jarrett",
      formattedData: []
    })
    this.handleClick()
  }

  render = () => {
    const BarSeries = VerticalBarSeries

    return (
      <div className="App">
        <div className="GitHub-link">
          <a href="https://github.com/matt-jarrett/glimpse">
            View on GitHub <i className="fa fa-github"/>
          </a>
        </div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          <input
            className="Input"
            autoFocus
            value={this.state.inputValue}
            onChange={(event) => this.updateInputValue(event)}
            onKeyPress={this.handleKeyPress}
          />
          <button
            className="Square-button"
            onClick={(event) => this.handleClick(event)}>
              Search
          </button>
        </div>
        <h3>{this.state.message}</h3>
        { this.state.formattedData.length > 0 &&
          <div className="Content">
            <XYPlot
              xType="ordinal"
              width={this.state.width}
              height={this.state.height}
            >
              <VerticalGridLines/>
              <HorizontalGridLines style={{ stroke: "#B4B4B4" }}/>
              <YAxis
                title="contributions"
                position="middle"
                tickFormat={(value) => {
                  if (value < 1) {
                    return value.toString().substring(1)
                  }
                  return value
                }}/>
              <XAxis
                hideLine
                tickPadding={-2}
                tickLabelAngle={-90}
                tickFormat={(value, index) => {
                  const year = value.substring(0, 4)
                  if (this.state.legend.includes(year)) {
                    return ""
                  } else if (index === 0) {
                    const smallDisplay = this.state.width < 400
                    const twentyDaysAfterStartYear = this.state.formattedData[20].x.substring(0, 4)
                    const gitHubAccountCreatedInLateOfYear = twentyDaysAfterStartYear !== year
                    if (smallDisplay || gitHubAccountCreatedInLateOfYear) {
                      this.state.legend.push(year)
                      return ""
                    } else {
                      this.state.legend.push(year)
                      return year
                    }
                  } else {
                    this.state.legend.push(year)
                    return year
                  }
                }}/>
              <BarSeries
                color="#601D9A"
                className="vertical-bar-series-example"
                data={ this.state.formattedData }/>
            </XYPlot>
            {/* <div className="ShareResults">
              <h3>Share results:</h3><input type="text" className="ShareResultsUrl" value={`https://glimpse.ninja/?username=${this.state.inputValue}`}/>
            </div> */}
          </div>
        }
        { this.state.loading &&
          <div>
            <br/><br/><br/><br/><br/><br/>
            <img src={loading} alt="loading" />
          </div>
        }
        { this.state.showDemo && this.state.demoMessage.length !== "" &&
          <div>
            <br/><br/><br/><br/><br/><br/>
            <h3>
              <a id="clickMe" onClick={this.demo}>{this.state.demoMessage}</a>
            </h3>
          </div>
        }
        <div className="Footer">
          <h4>
            Made with <i className="fa fa-heart"/>, JavaScript, and <i className="fa fa-github"/>
          </h4>
        </div>
      </div>
    )
  }
}

export default App
