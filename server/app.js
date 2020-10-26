const express = require('express')
const app = express()
const port = 3000
const router = require("./routes/router")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', router)

app.listen(port, () => {
  console.log(`connected to port ${port}`)
})