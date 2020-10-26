const express = require('express')
const app = express()
const router = require('../server/routes/router')
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))



// app.use('/', (req, res) => {
//     res.send({"message": "hello"})
// })

app.use(router)

app.listen(PORT, ()=> {
    console.log(`Listening port${PORT}`)
})

module.exports=router