const express = require('express')
const app = express()
const port = 3000;
const todoRoutes = require('./routes')

app.use ('/todos', todoRoutes)

app.listen(port, ()=> {
console.log(`connected to http://localhost:${port}/` )
})