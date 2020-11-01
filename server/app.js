require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const router = require('./routes/index')
const errorhandler = require('./midleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)
app.use(errorhandler)

app.listen(port, () => {
  console.log(`this app running at port:${port}`)
})