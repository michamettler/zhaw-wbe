const equal = function (a, b) {
  if (typeof a !== 'object' || typeof b !== 'object') return a === b
  if (Object.keys(a).length === 0 && Object.keys(b).length === 0) return true
  if (Object.keys(a).length !== Object.keys(b).length) return false

  for (let attr of Object.keys(a)) {
    if (a[attr] !== b[attr]) return false
  }
  return true
}

module.exports = { equal }
