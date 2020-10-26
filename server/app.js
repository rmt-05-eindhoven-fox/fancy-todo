const router = require('./routes/index')

const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Todos app listening at http://localhost:${PORT}`)
})