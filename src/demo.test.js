import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "./App.js"

test("Searching for a valid user works as expected", async () => {
  render(<App />)
  const message = screen.getByTestId("message")
  const demoButton = screen.getByTestId("demo-button")
  fireEvent.click(demoButton)
  expect(message).toHaveTextContent("Searching cujarrett's GitHub contributions")
  const loadingAnimation = screen.getByTestId("loading")
  expect(loadingAnimation).toBeInTheDocument()

  await waitFor(() => {
    const timeline = screen.getByTestId("timeline")
    expect(timeline).toBeInTheDocument()
  }, { timeout: 5000, interval: 250 })

  expect(message).toHaveTextContent("A glimpse at cujarrett's GitHub contributions")
  const shareResults = screen.getByTestId("share-results")
  expect(shareResults).toBeInTheDocument()
})
