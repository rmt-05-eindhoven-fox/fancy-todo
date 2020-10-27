require('dotenv').config();
const express = require('express');
const router = require('./routers/router');
const app = express();
const PORT = process.env.PORT;

// Error Handler
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});