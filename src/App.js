import React, { useState, useEffect } from "react"

import { Header } from "./components/header/index.js"
import { SearchBar } from "./components/search-bar/index.js"
import { MessageBar } from "./components/message-bar/index.js"
import { Content } from "./components/content/index.js"
import { Footer } from "./components/footer/index.js"

import { getGitHubContributions } from "./integrations/github.js"

import "./App.css"

const Glimpse = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [canceled, setCanceled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showDemo, setShowDemo] = useState(true)
  const [input, setInput] = useState("")
  const [contributions, setContributions] = useState([])
  const [message, setMessage] = useState("Search any GitHub username for a glimpse at their open source contributions")
  const [logoStyling, setLogoStyling] = useState("app-logo")
  const [footerStyling, setFooterStyling] = useState("footer")

  const handleClick = async () => {
    console.log({input})
    const contributions = await getGitHubContributions(input)
    setContributions(contributions)
  }

  useEffect(() => {
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
  })

  return (
    <div className="main">
      <Header logoStyling={logoStyling}/>
      <SearchBar input={input} setInput={setInput} setContributions={setContributions} handleClick={handleClick}/>
      <MessageBar message={message}/>
      <Content width={width} height={height} contributions={contributions} setInput={setInput} handleClick={handleClick}/>
      <Footer footerStyling={footerStyling}/>
    </div>
  )
}

export default Glimpse
