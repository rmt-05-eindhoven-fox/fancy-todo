//testing Bintang Wibawa
const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes/index.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Connected to port:${PORT}`);
})