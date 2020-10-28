require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')


app.use(cors())
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())


app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Connected to http://localhost:${port}`)
})