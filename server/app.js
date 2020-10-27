//testing Bintang Wibawa
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = +process.env.PORT
const routes = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandling')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Connected to port:${PORT}`);
})