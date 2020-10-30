const express = require('express')
const app = express()
const port = 3000
const todoRouter = require('./routes/todos');
const usersRouter = require('./routes/users');
const projectRouter = require('./routes/projects');
const memberRouter = require('./routes/members');
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")

require('dotenv').config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/todos', todoRouter);
app.use('/users', usersRouter);
app.use('/projects', projectRouter);
app.use('/members', memberRouter);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`I LOVE U ${port}`)
})