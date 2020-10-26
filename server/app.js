const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/todos', router)

app.listen(PORT,()=>{
    console.log(`app running at port ${PORT}`)
})