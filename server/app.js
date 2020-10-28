require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const route = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(route)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`i love you ${port}`)
})

