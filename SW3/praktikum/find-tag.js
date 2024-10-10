const findTag = (element) => {
  let found = false
  let word = ''
  let currentlyBuilding = false

  for (let i = 0; i < element.length; i++) {
    if (found) break
    let char = element[i]

    if (currentlyBuilding) {
      switch (char) {
        case '<':
          word = ''
          currentlyBuilding = true
          break
        case '>':
          found = true
          break
        case ' ':
          word = ''
          currentlyBuilding = false
          break
        default:
          word += element[i]
      }
    } else if (element[i] === '<') {
      currentlyBuilding = true
    }
  }
  return word !== '' ? word : undefined
}

module.exports = { findTag }
