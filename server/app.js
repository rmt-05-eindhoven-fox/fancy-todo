require('dotenv').config()
const express = require('express');
const routes = require('./routers/index');
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use('/', routes);

app.listen(port, () => {
    console.log(`connected http://localhost:${port}`);
})