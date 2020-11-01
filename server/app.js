require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const routes = require('./routes/index')
const errorHandler = require('./middlewares/error_handler')
const cors = require("cors")

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(cors())
app.use(routes)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})