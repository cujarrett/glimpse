import fetch from "node-fetch"

const getContributions = async (username) => {
  const url = `https://api.glimpse.ninja/github?username=${username}`
  const response = await fetch(url)
  const { contributions } = await response.json()

  let yearAnimationDelay = 0
  const yearColors = [
    "#bf360c",
    "#e65100",
    "#ff6f00",
    "#f57f17",
    "#827717",
    "#33691e",
    "#1b5e20",
    "#004d40",
    "#006064",
    "#01579b",
    "#0d47a1",
    "#1a237e",
    "#311b92",
    "#4a148c",
    "#880e4f",
    "#b71c1c",
    "#ff5722",
    "#ff9800",
    "#ffc107",
    "#ffeb3b",
    "#cddc39",
    "#8bc34a",
    "#4caf50",
    "#009688",
    "#00bcd4",
    "#03a9f4",
    "#2196f3",
    "#3f51b5",
    "#673ab7",
    "#9c27b0",
    "#e91e63",
    "#f44336"
  ]

  for (const year of Object.values(contributions)) {
    year.color = yearColors.pop()
    year.yearAnimationDelay = yearAnimationDelay
    yearAnimationDelay += 700
  }
  return contributions
}

export { getContributions }
