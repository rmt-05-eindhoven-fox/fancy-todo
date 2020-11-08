'use strict'
  require('dotenv').config()

const express = require('express')
const routes = require('./router/index')
const errHandler = require('./middlewares/errHandler')
const cors = require('cors')


const app = express()
const PORT = process.env.PORT || 3050


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)
app.use(errHandler)


app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
})