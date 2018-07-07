const fetch = require("node-fetch")
const uniqBy = require("lodash/uniqBy")

export const getGitHubUserData = async (userName) => {
  const url = `https://github-contributions-api.now.sh/v1/${userName}`
  const response = await fetch(url)
  let { contributions } = await response.json()
  contributions = contributions.reverse()

  const unique = uniqBy(contributions, "date")
  contributions = unique

  const correctedInitialDate = []
  let initialDateFound = false
  for (const contribution of contributions) {
    if (initialDateFound || contribution.count > 0) {
      correctedInitialDate.push(contribution)
      initialDateFound = true
    }
  }

  contributions = correctedInitialDate

  return contributions
}
