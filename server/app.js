'use strict'
  require('dotenv').config()

const express = require('express')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')


const app = express()
const PORT = process.env.PORT || 3050


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
})
