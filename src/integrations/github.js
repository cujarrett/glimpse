const fetch = require("node-fetch")

export const getGitHubContributions = async (userName) => {
  const url = `https://github-contributions-api.now.sh/v1/${userName}`
  let response = await fetch(url)
  response = await response.json()

  if (response.contributions.length === 0) {
    return []
  }

  const yearColors = [
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
  let yearAnimationDelay = 0

  const output = []

  const years = response.years.reverse()
  const contributions = response.contributions

  // Seed years in output
  for (const { year } of years) {
    const color = yearColors.pop()
    output.push({
      name: year,
      data: [
        { category: "January", value: 0 },
        { category: "February", value: 0 },
        { category: "March", value: 0 },
        { category: "April", value: 0 },
        { category: "May", value: 0 },
        { category: "June", value: 0 },
        { category: "July", value: 0 },
        { category: "August", value: 0 },
        { category: "September", value: 0 },
        { category: "October", value: 0 },
        { category: "November", value: 0 },
        { category: "December", value: 0 }
      ],
      color,
      yearAnimationDelay
    })
    yearAnimationDelay += 700
  }

  // Add month totals to years
  for (const contribution of contributions) {
    const contrbutionMonth = contribution.date.substring(5, 7) - 1
    const contrbutionYear = contribution.date.substring(0, 4)
    const count = contribution.count

    for (const year of output) {
      if (year.name === contrbutionYear) {
        year.data[contrbutionMonth].value = year.data[contrbutionMonth].value + count
      }
    }
  }

  // Remove months of year pior to first ever contribution
  let noContributionsYet = true
  for (const year of output) {
    if (year.name === years[0].year) {
      for (const month of year.data) {
        if (month.value === 0 && noContributionsYet) {
          month.value = null
        } else {
          noContributionsYet = false
        }
      }
    }
  }

  // Remove future months from current year
  const date = new Date()
  const currentYear = date.getFullYear().toString()
  const currentMonth = date.getMonth()

  for (const year of output) {
    if (year.name === currentYear) {
      for (let monthIndex = currentMonth + 1; monthIndex < 12; monthIndex++) {
        year.data[monthIndex].value = null
      }
      break
    }
  }

  return output
}
