import React, { Component } from "react"
import queryString from "query-string"

import { getGitHubContributions } from "./integrations/github.js"
import { isString, stringContainsValidCharacters } from "./util"
import "./App.css"

// --
import { Header } from "./components/header/index.js"
import { SearchBar } from "./components/search-bar/index.js"
import { MessageBar } from "./components/message-bar/index.js"
import { Content } from "./components/content/index.js"
import { Footer } from "./components/footer/index.js"

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
      contributions: [],
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
      contributions: [],
      legend: [],
      message: defaultMessage
    })
  }

  handleClick = async () => {
    this.setState({
      canceled: false,
      showDemo: false,
      loading: true,
      contributions: [],
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
        const contributions = await getGitHubContributions(this.state.inputValue)
        const notCanceled = !this.state.canceled
        const hasContributions = contributions.length > 0

        if (notCanceled && hasContributions) {
          this.setState({
            loading: false,
            showDemo: false,
            contributions: contributions,
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
    return (
      <div className="main">
        <Header/>
        <SearchBar/>
        <MessageBar/>
        <Content/>
        <Footer/>
      </div>
    )
  }
}

export default App
