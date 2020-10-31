require('dotenv').config()

const express = require('express')
const app = express()
const router = require('./routes')
const cors = require('cors')

const errorHandler = require('./middlewares/errorHandler')

const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log('lintening on port', port);
})