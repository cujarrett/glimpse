const fetch = require("node-fetch")

const getGitHubUserData = async (userName) => {
  const url = `https://github-contributions-api.now.sh/v1/${userName}`
  const response = await fetch(url)
  const json = await response.json()
  return json
}

getGitHubUserData("matt-jarrett")
