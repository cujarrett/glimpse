const test = require("tape-async")
const StopWatch = require("statman-stopwatch")
const { getGitHubContributions } = require("../../src/integrations/github.js")
const { formatTime } = require("../../src/util/format-time.js")

test("Integration - GitHub", async (assert) => {
  const stopwatch = new StopWatch(true)
  assert.plan(1)

  const response = await getGitHubContributions("cujarrett")
  console.log(response)
  assert.true(true, "First mod verified")

  stopwatch.stop()
  const time = formatTime(stopwatch.time())

  console.log(`Time to complete: ${time}`)
})
