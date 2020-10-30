require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const todosRouter = require('./routes/todos.js');
const userRouter = require('./routes/user.js');
const errorHandler = require('./middleware/errorHandler.js');
const movieRouter = require('./routes/movieRouter.js');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRouter);
app.use('/todos', todosRouter);
app.use('/movies', movieRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`app ini berjalan di http://localhost:${port}`);
});