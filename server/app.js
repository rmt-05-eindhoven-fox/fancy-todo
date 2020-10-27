require("dontenv").config();
const express = require('express')
const app = express()
const router = require('../server/routes/router')
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(router)

app.listen(PORT, ()=> {
    console.log(`App Listening port ${PORT}`)
})

module.exports=router