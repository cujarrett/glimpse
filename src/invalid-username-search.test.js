import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import App from "./App.js"

test("Searching for an Invalid user works as expected", async () => {
  render(<App />)
  const searchInput = screen.getByTestId("search-input")
  fireEvent.change(searchInput, { target: { value: "*" } })
  const searchButton = screen.getByTestId("search-button")
  fireEvent.click(searchButton)
  const message = screen.getByTestId("message")
  expect(message).toHaveTextContent("Not a valid GitHub username")
})
