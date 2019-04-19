import React from "react"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"

import "./style.css"

export const SearchBar = (props) => {

  const updateInput = (event) => {
    props.setContributions([])
    props.setCanceled(true)
    props.setLoading(false)
    props.setInput(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      props.handleClick()
    }
  }

  return (
    <div className="input">
      <Paper elevation={1}>
        <InputBase
          className="search-text" autoFocus
          value={props.input}
          onChange={(event) => updateInput(event)}
          onKeyPress={handleKeyPress} />
        <IconButton
          className="search-button"
          aria-label="Search"
          onClick={(event) => props.handleClick(event)}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}
