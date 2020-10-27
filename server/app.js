const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(router);

app.listen(PORT, console.log(`Listening at http://localhost:${PORT}`));