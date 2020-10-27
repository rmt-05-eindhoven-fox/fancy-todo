require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 3000
const todoRoutes = require("./routes/index");

app.use(express.urlencoded({extended: true}));

app.use(todoRoutes);

app.listen(PORT, ()=>{
    console.log("Application is listening on http://localhost:"+PORT);
})