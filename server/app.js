if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require('express');
const router = require('./routers/router');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});