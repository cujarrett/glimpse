import React from "react"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"

import "./style.css"

export const SearchBar = () => {
  return (
    <div className="input">
      <Paper elevation={1}>
        <InputBase
          className="search-text" autoFocus
          value={this.state.inputValue}
          onChange={(event) => this.updateInputValue(event)}
          onKeyPress={this.handleKeyPress} />
        <IconButton
          className="search-button icon-button"
          aria-label="Search"
          onClick={(event) => this.handleClick(event)}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}
