const express = require("express")
const app = express()
const PORT = 3000
const router = require('./routes/todo')
const user = require('./routes/user')
const errorHandler = require("./middlewares/errorHandler")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)
app.use('/users', user)
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log("App is running on http://localhost:" + PORT)
})