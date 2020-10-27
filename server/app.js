require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const router = require("./routes/router")
const errorHandling = require("./middlewares/errorHandling")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', router)
app.use(errorHandling)


app.listen(port, () => {
  console.log(`connected to port ${port}`)
})