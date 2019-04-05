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

  // const removeFuture = (month) => {
  //   const filteredMonth = {}

  //   for (const )
  // }

  // const temp = output.filter((item) => removeFuture(item))

  console.log(JSON.stringify(output, null, "  "))

  return output
}


// const temp = async () => {
//   const output = await getGitHubContributions("cujarrett")
//   console.log(output)
// }

// temp()

// const getRecentEvents = async (userName) => {

//   let userHasMoreEvents = true
//   let pageNumber = 1
//   const userEvents = []

//   while (userHasMoreEvents) {
//     console.log({pageNumber})
//     const url = `https://api.github.com/users/${userName}/events?page=${pageNumber}`
//     let response = await fetch(url)
//     response = await response.json()
//     console.log(response)
//     pageNumber++

//     if (response === [] || response.message === "In order to keep the API fast for everyone, pagination is limited for this resource. Check the rel=last link relation in the Link response header to see how far back you can traverse.") {
//       userHasMoreEvents = false
//     }

//     if (response.message.startsWith("API rate limit exceeded")) {
//       throw Error ("GitHub Event API limit exceeded.")
//     }
//   }

//   console.log(userEvents)
//   return userEvents
// }

// const temp = async () => {
//   getRecentEvents("cujarrett")
// }

// temp()
