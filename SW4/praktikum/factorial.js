const factorial = function (n) {
    const one = typeof n === 'bigint' ? 1n : 1
    if (n <= one) {
      return one
    } else {
      return n * factorial(n - one)
    }
}
module.exports = { factorial }