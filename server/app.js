const express = require('express')
const app = express()
const port = 3000
const todoRouter = require('./routes/todo');
const usersRouter = require('./routes/users');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', todoRouter);
app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.listen(port, () => {
  console.log(`I LOVE U ${port}`)
})