import React from "react"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "./App"

test("Searching for a valid user works as expected", async () => {
  act(() => {
    render(<App />)
  })
  const message = screen.getByTestId("message")
  expect(message).toBeInTheDocument()
  console.log(message.textContent)
  const searchInput = screen.getByTestId("search-input")
  act(() => {
    fireEvent.change(searchInput, { target: { value: "foo" } })
  })
  const searchButton = screen.getByTestId("search-button")
  act(() => {
    fireEvent.click(searchButton)
  })
  const loadingAnimation = screen.getByTestId("loading")
  expect(loadingAnimation).toBeInTheDocument()
  const timeline = await screen.getByTestId("timeline")
  expect(timeline).toBeInTheDocument()
  console.log(message.textContent)
  const shareResults = screen.getByTestId("share-results")
  expect(shareResults).toBeInTheDocument()
  console.log(message.textContent)
})

// TODO - Valid user search
// TODO - Empty search = Empty search ¯\_(ツ)_/¯
// TODO - Demo
// TODO - Invalid user search
