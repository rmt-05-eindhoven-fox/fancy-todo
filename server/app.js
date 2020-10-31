require("dotenv").config();
const express = require("express");
const route = require('./routes/index.js');
const errorHandle = require("./middlewares/errorHandler.js");

const PORT = process.env.PORT;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(route);
app.use(errorHandle);


app.listen(PORT, () => {
    console.log('listening on http://localhost:',PORT)
});