const { request } = require('https')

const parameter = process.argv[2] || 'default'

console.log('Call wttr.in/' + parameter)

let rq = request(
  {
    hostname: 'wttr.in',
    path: `/${parameter}?format=j1`,
    method: 'GET',
  },
  (response) => {
    let data = ''

    response.on('data', (chunk) => {
      data += chunk
    })

    response.on('end', () => {
      try {
        const json = JSON.parse(data)
        const feelsLikeC = json.current_condition[0].FeelsLikeC
        console.log(`${feelsLikeC}°`)
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    })
  }
)

rq.end()
