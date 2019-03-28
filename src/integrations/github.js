const fetch = require("node-fetch")
const uniqBy = require("lodash/uniqBy")

const getGitHubContributions = async (userName) => {
  const url = `https://github-contributions-api.now.sh/v1/${userName}`
  let response = await fetch(url)
  response = await response.json()
  return response
}

const temp = async () => {
  const response = await getGitHubContributions("cujarrett")
  console.log(JSON.stringify(response, null, "  "))
  const contributions = response.contributions.reverse()

  // {name: "January", "2016": 200, "2017": 322, "2018": 352},
  // {name: "February", "2016": 20, "2017": 240, "2018": 276},

  const months = { "01": [], "02": [], "03": [], "04": [], "05": [], "06": [], "07": [], "08": [], "09": [], "10": [], "11": [], "12": [] }

  for (const contribution of contributions) {
    const month = contribution.date.substring(5, 7)
    const year = contribution.date.substring(0, 4)
    const count = contribution.count
    if (count > 0) {
      months[month].push({
        year,
        count
      })
    }
  }

  const output = [
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

  for (let month of Object.keys(months)) {
    const years = months[month]

    for (const year of years) {
      output[Number(month - 1)][year.year] = year.count
    }
  }
  console.log(output)
}


temp()
