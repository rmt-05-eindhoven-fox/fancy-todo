require('dotenv').config();
const express = require('express');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Fancy Todo app is listening on ${PORT}`));