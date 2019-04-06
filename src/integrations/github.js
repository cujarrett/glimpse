const fetch = require("node-fetch")

export const getGitHubContributions = async (userName) => {
  const url = `https://github-contributions-api.now.sh/v1/${userName}`
  let response = await fetch(url)
  response = await response.json()

  if (response.contributions.length === 0) {
    return 0
  }

  let output = [
    { name: "January" },
    { name: "February" },
    { name: "March" },
    { name: "April" },
    { name: "May" },
    { name: "June" },
    { name: "July" },
    { name: "August" },
    { name: "September" },
    { name: "October" },
    { name: "November" },
    { name: "December" }
  ]

  // Seed output with 0's for all years active
  for (const month of output) {
    for (const { year } of response.years) {
      month[year] = 0
    }
  }

  // Push contribution data into months object
  const contributions = response.contributions
  const months = { "01": [], "02": [], "03": [], "04": [], "05": [], "06": [], "07": [], "08": [], "09": [], "10": [], "11": [], "12": [] }

  for (const contribution of contributions) {
    const month = contribution.date.substring(5, 7)
    const year = contribution.date.substring(0, 4)
    const count = contribution.count

    months[month].push({
      year,
      count
    })
  }

  for (let month of Object.keys(months)) {
    const years = months[month]

    for (const year of years) {
      const priorYearCount = output[Number(month - 1)][year.year]
      output[Number(month - 1)][year.year] = priorYearCount + year.count
    }
  }

  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()

  for (let monthIndex = month + 1; monthIndex < 11; monthIndex++) {
    delete output[monthIndex][year]
  }

  return output
}
