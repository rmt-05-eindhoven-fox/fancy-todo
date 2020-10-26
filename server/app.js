'use strict'

const express = require('express')
const app = express()
const port = 3000
const router = require('./router/todo-routes')

app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, ()=>console.log(`listening to http://localhost:${port}`));