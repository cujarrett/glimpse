workflow "CI/CD" {
  on = "push"
  resolves = [
    "Lint",
    "Deploy to Heroku",
  ]
}

action "Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm install"
}

action "Lint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Build"]
  runs = "npm run lint"
}

action "Test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Build"]
  runs = "npm run test"
}

action "Login to Heroku" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  needs = ["Lint", "Test"]
  args = "container:login"
  secrets = ["HEROKU_API_KEY"]
}

action "Push to Heroku" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  needs = ["Login to Heroku"]
  args = "container:push -a github-glimpse web"
  secrets = ["HEROKU_API_KEY"]
}

action "Deploy to Heroku" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  needs = ["Push to Heroku"]
  secrets = ["HEROKU_API_KEY"]
  args = "container:release -a github-glimpse web"
}
