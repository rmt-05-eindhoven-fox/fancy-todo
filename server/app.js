require('dotenv').config()
const express = require("express");
const router = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { urlencoded } = require('express');
const app = express();
const port = process.env.PORT;

app.use(urlencoded({ extended: true }));
app.use(express.json())
app.use(router);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});
