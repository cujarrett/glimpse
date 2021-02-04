import fetch from "node-fetch"
const proxyurl = "https://api.codetabs.com/v1/proxy?quest="

const getContributions = async (username) => {
  const contributionYears = await getContributionYears(username)
  if (contributionYears.length === 0) {
    return []
  }
  const rawContributionData = await getRawContributionData(username, contributionYears)
  const formattedContributionsByYear = await getFormattedContributionsByYear(rawContributionData, contributionYears)

  return formattedContributionsByYear
}

const getContributionYears = async (username) => {
  const contributionYearsRegularExpression = /year-link-\d{4}/g
  let url = `${proxyurl}https://github.com/${username}`
  if (process.env.NODE_ENV === "test") {
    url = url.replace(proxyurl, "")
  }
  const response = await fetch(url)
  const data = await response.text()
  const matches = data.match(contributionYearsRegularExpression)
  if (!matches) {
    return []
  }
  const contributionYears = matches.map((year) => year.replace("year-link-", ""))

  return contributionYears
}

const getRawContributionData = async (username, contributionYears) => {
  const output = []
  for (const year of contributionYears) {
    let url = `${proxyurl}https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`
    if (process.env.NODE_ENV === "test") {
      url = url.replace(proxyurl, "")
    }
    const response = await fetch(url)
    const data = await response.text()
    const contributionRegularExpressionPattern = (year) => `(data-count="\\d*".*data-date="${year}-\\d{2}-\\d{2}")`
    const contributionRegularExpression = new RegExp(contributionRegularExpressionPattern(year), "g")
    const matches = data.match(contributionRegularExpression)
    const contributions = matches.map((match) => {
      return {
        count: +match.match(/data-count="(\d*)"/)[1],
        date: match.match(/data-date="(\d{4}-\d{2}-\d{2})"/)[1]
      }
    })
    output.push(...contributions)
  }

  return output
}

const getFormattedContributionsByYear = async (contributions) => {
  let years = []
  for (const contribution of contributions) {
    const year = contribution.date.substring(0, 4)
    if (!years.includes(year)) {
      years.push(year)
    }
  }

  const output = []
  let yearAnimationDelay = 0
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

  years = years.reverse()

  // Seed years in output
  for (const year of years) {
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
    const contributionYear = contribution.date.substring(0, 4)
    const contributionMonth = contribution.date.substring(5, 7) - 1
    const count = contribution.count

    for (const year of output) {
      const yearMatch = year.name === contributionYear
      const hasContributions = count > 0
      if (yearMatch && hasContributions) {
        year.data[contributionMonth].value += count
      }
    }
  }

  // Remove months of year pior to first ever contribution
  let noContributionsYet = true
  for (const year of output) {
    if (year.name === years[0]) {
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

export { getContributions }
