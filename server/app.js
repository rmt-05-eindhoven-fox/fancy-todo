require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const router = require('./routes/index')
const ErrorHandler = require('./middlewares/ErrorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(router);
app.use(ErrorHandler)

app.listen(PORT, console.log(`Listening at http://localhost:${PORT}`));