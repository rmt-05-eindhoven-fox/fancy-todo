require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const router = require('./routes/index')

app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
  console.log(`Connected to http://localhost:${port}`)
})