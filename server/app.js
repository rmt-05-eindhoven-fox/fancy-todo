const express = require("express");
const app = express();
const todosRouter = require("./routes/todosRouter");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/todos", todosRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
