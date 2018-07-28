module.exports.isString = (input) => {
  return typeof input === "string"
}

module.exports.stringContainsValidCharacters = (input) => {
  const invalidCharacters = ["#", "%", "/", "\\", ".", "?"]
  for (const invalidCharacter of invalidCharacters) {
    if (input.includes(invalidCharacter)) {
      return false
    }
  }
  return true
}
