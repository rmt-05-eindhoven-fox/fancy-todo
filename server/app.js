const express = require("express")
const route = require('./routes/index.js')
const PORT = 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(route)

app.listen(PORT)
