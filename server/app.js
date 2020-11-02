const express = require('express');
const router = require('./routes');
require('dotenv').config()
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})