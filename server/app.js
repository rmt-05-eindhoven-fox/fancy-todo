require('dotenv').config()
const express = require('express')
const errorhandler = require('./middlewares/errorhandler')
const app = express()
const PORT = 3000
const routes = require('./routes')

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(routes)

app.use(errorhandler)

app.listen(PORT, _=> console.log('We are Hactiv'+PORT/375))