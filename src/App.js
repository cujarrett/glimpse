import React, { Component } from "react"
import queryString from "query-string"
// eslint-disable-next-line max-len
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, RedditShareButton, EmailShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, RedditIcon, EmailIcon } from "react-share"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts"

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

  updateWindowDimensions = async () => {
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
    const shareUrl = `https://www.glimpse.ninja/?username=${this.state.inputValue}`
    const title = "Check out my #GitHub contributions via Glimpse"

    const data = [
      {name: "January", "2016": 200, "2017": 322, "2018": 352},
      {name: "February", "2016": 20, "2017": 240, "2018": 276},
      {name: "March", "2016": 100, "2017": 182, "2018": 186},
      {name: "April", "2016": 100, "2017": 230, "2018": 308},
      {name: "May", "2016": 200, "2017": 301, "2018": 208},
      {name: "June", "2016": 333, "2017": 422, "2018": 100},
      {name: "July", "2016": 281, "2017": 188, "2018": 291},
      {name: "August", "2016": 52, "2017": 278, "2018": 388},
      {name: "September", "2016": 511, "2017": 301, "2018": 307},
      {name: "October", "2016": 555, "2017": 201, "2018": 222},
      {name: "November", "2016": 231, "2017": 488, "2018": 107},
      {name: "December", "2016": 482, "2017": 409, "2018": 209}
    ]

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

            <LineChart width={this.state.width} height={this.state.height} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Line type="monotone" dataKey="2016" stroke="#ff1744" activeDot={{r: 8}}/>
              <Line type="monotone" dataKey="2017" stroke="#3d5afe" />
              <Line type="monotone" dataKey="2018" stroke="#1de9b6" />
            </LineChart>

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
