const fs = require('fs')

let timestamp = new Date().toString()
let contents

let promise = new Promise((resolve, reject) => {
  fs.writeFile('date.txt', timestamp, (err) => {
    if (err) reject(err)
    else resolve()
  })
})

promise
  .then(() => {
    fs.readFile('date.txt', (err, data) => {
      contents = data.toString()
      console.log('Comparing the contents')
      console.assert(timestamp === contents)
    })
  })
  .catch((err) => {
    console.error(err)
  })
