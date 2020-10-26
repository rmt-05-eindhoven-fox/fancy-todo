const express = require('express')
const app = express()
const router = require('./routes/todo')

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/todos', router)

app.listen(port, () => {
    console.log('lintening on port', port);
})