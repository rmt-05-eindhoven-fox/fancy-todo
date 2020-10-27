require('dotenv').config()

const express = require('express')
const app = express()
const router = require('./routes')

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.listen(port, () => {
    console.log('lintening on port', port);
})