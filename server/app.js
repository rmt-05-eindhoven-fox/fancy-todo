require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./routes/index");
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
