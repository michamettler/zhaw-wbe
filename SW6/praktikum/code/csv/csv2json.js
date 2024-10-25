const fs = require('fs')
const path = require('path')

const csv2json = (inputFilePath, outputFilePath) => {
  console.time('Time taken to read and convert file')

  const stats = fs.statSync(inputFilePath)
  // erst Sync Methode, da Event Loop noch nicht behandelt in VL
  console.log('File Size:', stats.size, 'bytes')
  console.log('Last Modified:', stats.mtime)

  const fileContent = fs.readFileSync(inputFilePath, 'utf8')

  const lines = fileContent.split('\n')
  const headers = lines[0].split(',')

  const jsonData = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line) {
      const values = line.split(',')
      const record = {}
      headers.forEach((header, index) => {
        record[header.trim()] = values[index].trim()
      })
      jsonData.push(record)
    }
  }

  const jsonString = JSON.stringify(jsonData, null, 2)

  fs.writeFileSync(outputFilePath, jsonString, 'utf8')

  console.log('Number of Records:', jsonData.length)
  console.timeEnd('Time taken to read and convert file')
}

const inputFilePath = 'population.csv'
const outputFilePath = 'output.json'
if (outputFilePath === 'csv2json.js') {
  console.error('Error: Output and Javascript file paths must be different.')
  process.exit(1)
}

csv2json(inputFilePath, outputFilePath)
