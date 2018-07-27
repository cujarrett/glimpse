import React, { Component } from "react"
import "./App.css"
import { getGitHubUserData } from "./services/github"
import logo from "./glimpse-logo.png"
import loading from "./loading.gif"
import queryString from "query-string"
// Disable eslint max-len for imports from react-vis and react-share
// eslint-disable-next-line max-len
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries } from "react-vis"
// eslint-disable-next-line max-len
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, RedditShareButton, EmailShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, RedditIcon, EmailIcon } from "react-share"

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
      demoMessage: defaultDemoMessage,
      logoStyling: "app-logo",
      footerStyling: "footer"
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
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    let logoStyling = "app-logo"
    let footerStyling = "footer"

    if (windowWidth < 400) {
      logoStyling = "app-logo-small-display"
    }

    if (windowHeight < 675 && windowWidth > 400) {
      footerStyling = "footer-small-display"
    }

    this.setState({
      width: .90 * (windowWidth),
      height: .50 * (windowHeight - 20),
      logoStyling,
      footerStyling
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

  sanatizeInput = () => {
    let inputValue = this.state.inputValue
    inputValue = inputValue.replace("#", "")
    inputValue = inputValue.replace("%", "")
    inputValue = inputValue.replace("\\", "")
    inputValue = inputValue.replace("/", "")
    inputValue = inputValue.replace(".", "")
    inputValue = inputValue.replace("?", "")

    this.setState({
      inputValue
    })
  }

  handleClick = async () => {
    this.sanatizeInput()

    if (this.state.inputValue !== "") {
      this.setState({
        canceled: false,
        loading: true,
        formattedData: [],
        legend: [],
        message: `Searching ${this.state.inputValue}'s GitHub contributions...`,
        demoMessage: ""
      })

      let contributions = []
      try {
        contributions = await getGitHubUserData(this.state.inputValue)
      } catch (error) {
        contributions.length = 0
      }

      if (contributions.length === 0) {
        if (!this.state.canceled) {
          const username = this.state.inputValue
          let message = `No GitHub contributions found for ${this.state.inputValue}`
          if (!username) {
            message = "No GitHub contributions found"
          }
          this.setState({
            loading: false,
            formattedData: [],
            legend: [],
            message,
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
    const shareUrl = `https://www.glimpse.ninja/?username=${this.state.inputValue}`
    const title = "Check out my #GitHub contributions via Glimpse!"

    return (
      <div className="app">
        <div className="github-link">
          <a href="https://github.com/matt-jarrett/glimpse">
            View on GitHub <i className="fa fa-github"/>
          </a>
        </div>
        <div className="app-header">
          <img src={logo} className={this.state.logoStyling} alt="logo" />
        </div>
        <div>
          <input
            className="input"
            autoFocus
            value={this.state.inputValue}
            onChange={(event) => this.updateInputValue(event)}
            onKeyPress={this.handleKeyPress}
          />
          <button
            className="square-button"
            onClick={(event) => this.handleClick(event)}>
              Search
          </button>
        </div>
        <h4>{this.state.message}</h4>
        { this.state.formattedData.length > 0 &&
          <div className="content">
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
                data={ this.state.formattedData }/>
            </XYPlot>
            <div className="share-results">
              <div className="share-results-header">
                <h4>Share your GitHub contributions!</h4>
              </div>
              <div className="network">
                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  className="network-share-button">
                  <FacebookIcon
                    size={32}
                    round />
                </FacebookShareButton>
              </div>
              <div className="network">
                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  className="network-share-button">
                  <TwitterIcon
                    size={32}
                    round />
                </TwitterShareButton>
              </div>
              <div className="network">
                <LinkedinShareButton
                  url={shareUrl}
                  title={title}
                  windowWidth={750}
                  windowHeight={600}
                  className="network-share-button">
                  <LinkedinIcon
                    size={32}
                    round />
                </LinkedinShareButton>
              </div>
              <div className="network">
                <RedditShareButton
                  url={shareUrl}
                  title={title}
                  windowWidth={660}
                  windowHeight={460}
                  className="network-share-button">
                  <RedditIcon
                    size={32}
                    round />
                </RedditShareButton>
              </div>
              <div className="network">
                <EmailShareButton
                  url={shareUrl}
                  subject={title}
                  body={`${title} \n${shareUrl}`}
                  className="network-share-button">
                  <EmailIcon
                    size={32}
                    round />
                </EmailShareButton>
              </div>
            </div>
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
            <h4>
              <a className="clickable" onClick={this.demo}>{this.state.demoMessage}</a>
            </h4>
          </div>
        }
        <div className={this.state.footerStyling}>
          <h4>
            Made with <i className="fa fa-heart"/>, JavaScript, and <i className="fa fa-github"/>
          </h4>
        </div>
      </div>
    )
  }
}

export default App
