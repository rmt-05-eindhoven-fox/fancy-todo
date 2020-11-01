require("dotenv").config()
const express = require("express");
const router = require('./router/index')
const cors = require('cors')
const app = express();
const port = 3000
const errHandler = require('./middleware/errorhandler')

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(router)
app.use(errHandler)

app.listen(port, () => console.log(`running http://localhost:${port}`))