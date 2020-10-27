'use strict'
require('dotenv').config()
const express = require('express')
const router = require('./routes/index')


const app = express()
const PORT = process.env.PORT || 3050


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)


app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
})