const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const router = require('./routers/index.js')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})