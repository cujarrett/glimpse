import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "./App.js"

test("Searching for an Invalid user works as expected", async () => {
  render(<App />)
  const message = screen.getByTestId("message")
  const searchInput = screen.getByTestId("search-input")
  fireEvent.change(searchInput, { target: { value: "not-a-valid-user" } })
  const searchButton = screen.getByTestId("search-button")
  fireEvent.click(searchButton)
  expect(message).toHaveTextContent("Searching not-a-valid-user's GitHub contributions")
  const loadingAnimation = screen.getByTestId("loading")
  expect(loadingAnimation).toBeInTheDocument()

  await waitFor(() => {
    expect(message).toHaveTextContent("not-a-valid-user isn't a GitHub user")
  }, { timeout: 5000, interval: 250 })
})
