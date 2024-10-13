const SCRIPTS = require('./scripts.js')

const scriptOfSample = (c, scripts) => {
  const uni = c.codePointAt(0)
  const found = scripts.find((script) =>
    script.ranges.some((range) => range[0] <= uni && range[1] >= uni)
  )
  return found ? found.name : 'unknown'
}

const scriptsInString = (text) => {
  let result = {}
  text.split('').forEach((el) => {
    const response = scriptOfSample(el, SCRIPTS)
    result[response] ? (result[response] += 1) : (result[response] = 1)
  })
  return result
}

module.exports = { scriptOfSample }
