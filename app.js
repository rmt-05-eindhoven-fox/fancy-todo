const express = require('express')
const router = require('./server/routers/index')

const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json)

app.use('/todos', router)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})