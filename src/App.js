import React, { Component } from "react"
import queryString from "query-string"
// Disable eslint max-len for imports from react-vis and react-share
// eslint-disable-next-line max-len
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries } from "react-vis"
// eslint-disable-next-line max-len
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, RedditShareButton, EmailShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, RedditIcon, EmailIcon } from "react-share"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import { getGitHubUserData } from "./services/github"
import { isString, stringContainsValidCharacters } from "./util"
import "./App.css"
import logo from "./glimpse-logo.png"
import loading from "./loading.svg"

const defaultMessage = "Search any GitHub username for a glimpse at their open source contributions"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
      canceled: false,
      loading: false,
      showDemo: true,
      inputValue: "",
      formattedData: [],
      legend: [],
      message: defaultMessage,
      demoMessage: "Show me a demo",
      logoStyling: "app-logo",
      footerStyling: "footer"
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount = async () => {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)

    const urlArguments = queryString.parse(window.location.search)
    const username = urlArguments.username

    if (username) {
      const usernameIsString = isString(username)
      const usernameContainsValidCharacters = stringContainsValidCharacters(username)
      if (usernameIsString && usernameContainsValidCharacters) {
        await this.setState({ inputValue: username })
        this.handleClick()
      }
    }
    if (urlArguments) {
      window.history.pushState("", "Glimpse", "/")
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
      loading: false,
      inputValue: event.target.value,
      formattedData: [],
      legend: [],
      message: defaultMessage
    })
  }

  handleClick = async () => {
    this.setState({
      canceled: false,
      showDemo: false,
      loading: true,
      formattedData: [],
      legend: [],
      message: `Searching ${this.state.inputValue}'s GitHub contributions`
    })

    const noResultsFound = {
      loading: false,
      showDemo: true,
      message: "No GitHub contributions found"
    }

    try {
      const inputNotEmpty = this.state.inputValue.length > 0
      const userNameValid = stringContainsValidCharacters(this.state.inputValue)

      if (inputNotEmpty && userNameValid) {
        const contributions = await getGitHubUserData(this.state.inputValue)
        const notCanceled = !this.state.canceled
        const hasContributions = contributions.length > 0

        if (notCanceled && hasContributions) {
          this.setState({
            loading: false,
            showDemo: false,
            formattedData: contributions,
            message: `A glimpse at ${this.state.inputValue}'s GitHub contributions`
          })
        } else {
          this.setState(noResultsFound)
        }
      } else {
        this.setState(noResultsFound)
      }
    } catch (error) {
      this.setState(noResultsFound)
    }
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleClick()
    }
  }

  demo = async () => {
    await this.setState({ inputValue: "cujarrett" })
    this.handleClick()
  }

  render = () => {
    const BarSeries = VerticalBarSeries
    const shareUrl = `https://www.glimpse.ninja/?username=${this.state.inputValue}`
    const title = "Check out my #GitHub contributions via Glimpse"

    return (
      <div className="main">
        <div className="github-link">
          <a href="https://github.com/cujarrett/glimpse">
            View on GitHub <i className="fa fa-github"/>
          </a>
        </div>
        <div className="app-header">
          <a href="https://glimpse.ninja"><img src={logo} className={this.state.logoStyling} alt="logo" /></a>
        </div>
        <div className="input">
          <Paper elevation={1}>
            <InputBase
              className="search-text" autoFocus
              value={this.state.inputValue}
              onChange={(event) => this.updateInputValue(event)}
              onKeyPress={this.handleKeyPress}
            />
            <IconButton
              className="search-button icon-button"
              aria-label="Search"
              onClick={(event) => this.handleClick(event)}>
              <SearchIcon />
            </IconButton>
          </Paper>
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
              <HorizontalGridLines style={{ stroke: "#616161" }}/>
              <YAxis
                style={{ text: {fill: "#bcbcbc"} }}
                title="contributions"
                position="middle"
                tickFormat={(value) => {
                  if (value < 1) {
                    return value.toString().substring(1)
                  }
                  return value
                }}/>
              <XAxis
                style={{ text: {fill: "#bcbcbc"} }}
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
                color="#FFF"
                data={ this.state.formattedData }/>
            </XYPlot>
            <div className="share-results">
              <div className="share-results-header">
                <h4>Share your GitHub contributions</h4>
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
        { this.state.showDemo &&
          <div>
            <br/><br/><br/><br/><br/><br/>
            <h4>
              <button
                type="button"
                className="clickable"
                onClick={this.demo}>
                {this.state.demoMessage}
              </button>
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
