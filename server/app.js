'use strict'

require('dotenv').config();

const express = require('express');
const authentication = require('./middlewares/authentication.js');
const errorhandle = require('./middlewares/errorhandle.js');
const app = express();
const port = 3000;
const router = require('./router/');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authentication);
app.use(router);
app.use(errorhandle)

app.listen(port, ()=>console.log(`listening to http://localhost:${port}`));