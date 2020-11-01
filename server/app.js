require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const router = require('./routers/')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})