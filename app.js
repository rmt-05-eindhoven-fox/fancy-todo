require('dotenv').config()

const express = require('express')
const router = require('./server/routers/index')
const errorHandler = require('./server/middlewares/errorHandler')

const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})