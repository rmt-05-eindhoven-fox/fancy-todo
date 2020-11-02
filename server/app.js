require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/index");
const port = process.env.PORT;
const Middleware = require("./middlewares/middleware");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(Middleware.errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
