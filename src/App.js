import React, { useState, useEffect } from "react"

import { Header } from "./components/header/index.js"
import { SearchBar } from "./components/search-bar/index.js"
import { MessageBar } from "./components/message-bar/index.js"
import { Content } from "./components/content/index.js"
import { Footer } from "./components/footer/index.js"

import { getContributions } from "./integrations/github.js"
import { isString, stringContainsValidCharacters } from "./utils/string-utils.js"

import "./App.css"

const Glimpse = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [canceled, setCanceled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showDemo, setShowDemo] = useState(true)
  const [input, setInput] = useState(window.location.pathname.substring(1))
  const [contributions, setContributions] = useState([])
  const [message, setMessage] = useState("Search any GitHub username for a glimpse at their open source contributions")
  const [logoStyling, setLogoStyling] = useState("app-logo")
  const [footerStyling, setFooterStyling] = useState("footer")

  const handleClick = async (username = input) => {
    const emptyInput = username === ""
    const inputNotAString = !isString(username)
    const inputHasInvalidCharacters = !stringContainsValidCharacters(username)

    if (emptyInput) {
      setContributions([])
      setLoading(false)
      setMessage("Empty search ¯\\_(ツ)_/¯")
      setShowDemo(true)
    } else if (inputNotAString || inputHasInvalidCharacters) {
      setContributions([])
      setLoading(false)
      setMessage("Not a valid GitHub username")
      setShowDemo(true)
    } else {
      setContributions([])
      setCanceled(false)
      setShowDemo(false)
      setLoading(true)
      setMessage(`Searching ${username}'s GitHub contributions`)
      const contributions = await getContributions(username)
      setLoading(false)
      setMessage(`A glimpse at ${username}'s GitHub contributions`)
      window.history.pushState("", "Glimpse", `/${username}`)
      setContributions(contributions)

      if (contributions.length === 0) {
        setMessage(`${input} isn't a GitHub user`)
        setShowDemo(true)
      }
    }
  }

  const handleResize = () => {
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

    setWidth(.9 * window.innerWidth)
    setHeight(.5 * window.innerHeight - 20)
    setLogoStyling(logoStyling)
    setFooterStyling(footerStyling)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Runs on initial load and if the url has a username in it it will trigger a search (https://glimpse.ninja/foo)
  useEffect(() => {
    const usernameIsString = isString(input)
    const usernameContainsValidCharacters = stringContainsValidCharacters(input)
    if (usernameIsString && usernameContainsValidCharacters) {
      handleClick()
    }
    // This function only runs on initial load and afterwards it has no need to check dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="main">
      <Header logoStyling={logoStyling}/>
      <SearchBar
        input={input}
        setInput={setInput}
        setContributions={setContributions}
        handleClick={handleClick}
        setLoading={setLoading}
        loading={loading}
        setCanceled={setCanceled}
        setMessage={setMessage} />
      <MessageBar
        message={message}
        contributions={contributions}
        input={input} />
      <Content
        width={width}
        height={height}
        loading={loading}
        showDemo={showDemo}
        contributions={contributions}
        input={input}
        setInput={setInput}
        handleClick={handleClick}
        canceled={canceled} />
      <Footer footerStyling={footerStyling}/>
    </div>
  )
}

export default Glimpse
