const router = require('./routes/index')
require('dotenv').config()
const errorHandler = require('./middlewares/errorHandler')

const cors = require("cors")
const express = require('express')
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)
app.use(errorHandler) //harus di stlh endpoint

app.listen(PORT, () => {
  console.log(`Todos app listening at http://localhost:${PORT}`)
})