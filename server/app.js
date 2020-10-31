require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Fancy Todo app is listening on ${PORT}`));