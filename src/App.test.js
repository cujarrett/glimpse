import React from "react"
import { fireEvent, render } from "@testing-library/react"
import App from "./App"

test("renders initial message", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Search any GitHub username for a glimpse at their open source contributions/i)
  expect(linkElement).toBeInTheDocument()
})

test("demo works as expected", async () => {
  const { getByText } = render(<App />)
  // Click button
  fireEvent.click(getByText(/Show me a demo/i))

  // Wait for page to update with query text
  const items = await findByText(node, /Item #[0-9]: /)
  expect(items).toHaveLength(10)
})