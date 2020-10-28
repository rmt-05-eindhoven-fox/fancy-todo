require("dotenv").config();
const express = require("express");
const route = require('./routes/index.js');
const errorHandler = require("./middlewares/errorHandlers.js")

const PORT = process.env.PORT;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(route);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('listening on http://localhost:',PORT)
});