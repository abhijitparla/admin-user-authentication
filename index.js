const express = require('express')
const { Mongoose } = require('mongoose')
const app = express()
const port = 3000
const localDB = `mongodb://localhost:27017`

const connectDB = async () => {
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function caluculator(a, b) {
  return a+b
}

export default caluculator
