import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import TextField from "@material-ui/core/TextField"

import "./style.css"

export const SearchBar = (props) => {
  const updateInput = (event) => {
    window.history.pushState("", "Glimpse", "/")
    props.setContributions([])
    props.setCanceled(true)
    props.setLoading(false)
    props.setInput(event.target.value)
    props.setMessage("")
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      props.handleClick()
    }
  }

  return (
    <div className="input">
      <Paper elevation={1}>
        <TextField
          className="search-text"
          autoFocus={window.innerWidth > 400}
          value={props.input}
          onChange={(event) => updateInput(event)}
          onKeyPress={handleKeyPress}
          inputProps={{ "data-testid": "search-input" }} />
        <IconButton
          className="search-button"
          aria-label="Search"
          onClick={() => props.handleClick()}
          data-testid="search-button" >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}

SearchBar.propTypes = {
  setContributions: PropTypes.func,
  setCanceled: PropTypes.func,
  setLoading: PropTypes.func,
  setInput: PropTypes.func,
  handleClick: PropTypes.func,
  input: PropTypes.string,
  setMessage: PropTypes.func
}
