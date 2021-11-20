import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "../src/App.js"

test("Searching for a valid user works as expected", async () => {
  render(<App />)
  const message = screen.getByTestId("message")
  const searchInput = screen.getByTestId("search-input")
  fireEvent.change(searchInput, { target: { value: "circa10a" } })
  const searchButton = screen.getByTestId("search-button")
  fireEvent.click(searchButton)
  expect(message).toHaveTextContent("Searching circa10a's GitHub contributions")
  const loadingAnimation = screen.getByTestId("loading")
  expect(loadingAnimation).toBeInTheDocument()

  await waitFor(() => {
    const timeline = screen.getByTestId("timeline")
    expect(timeline).toBeInTheDocument()
  }, { timeout: 7000, interval: 250 })

  expect(message).toHaveTextContent("A glimpse at circa10a's GitHub contributions")
  const shareResults = screen.getByTestId("share-results")
  expect(shareResults).toBeInTheDocument()
})
