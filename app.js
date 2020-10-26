const express = require('express');
const app = express();
const port = 3000;
const todosRouter = require('./routes/todos.js');

app.use(express.urlencoded(({ extended: true }));
app.use(express.json());

app.use('/todos', todosRouter);

app.listen(port, () => {
    console.log(`app ini berjalan di http://localhost:${port}`);
});