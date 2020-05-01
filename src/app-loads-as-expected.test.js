import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App.js"

test("App loads as expected works as expected", async () => {
  render(<App />)
  const message = screen.getByTestId("message")
  expect(message).toHaveTextContent("Search any GitHub username for a glimpse at their open source contributions")
  const searchInput = screen.getByTestId("search-input")
  expect(searchInput).toHaveTextContent("")
  const searchButton = screen.getByTestId("search-button")
  expect(searchButton).toBeInTheDocument()
  const demoButton = screen.getByTestId("demo-button")
  expect(demoButton).toHaveTextContent("Show me a demo")
  const footer = screen.getByTestId("footer")
  expect(footer).toBeInTheDocument()
})
