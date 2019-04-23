module.exports.isString = (input) => {
  return typeof input === "string"
}

module.exports.stringContainsValidCharacters = (input) => {
  if (input === "") {
    return false
  }

  // Disable max-len to fit all alpha numeric values and hyphen to follow GitHub username rules
  // eslint-disable-next-line max-len
  const validCharacters = ["A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"]
  for (const char of input) {
    if (!validCharacters.includes(char)) {
      return false
    }
  }
  return true
}
