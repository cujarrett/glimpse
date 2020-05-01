import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import App from "./App.js"

test("Empty Search works as expected", async () => {
  render(<App />)
  const searchButton = screen.getByTestId("search-button")
  fireEvent.click(searchButton)
  const message = screen.getByTestId("message")
  expect(message).toHaveTextContent("Empty search ¯\\_(ツ)_/¯")
})
