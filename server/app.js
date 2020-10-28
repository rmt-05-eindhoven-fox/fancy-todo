require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 3000
const routes = require("./routes/index");

app.use(express.urlencoded({extended: true}));

app.use(routes);

app.listen(PORT, ()=>{
    console.log("Application is listening on http://localhost:"+PORT);
})