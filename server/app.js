require('dotenv').config();
const express = require('express');
const router = require('./routers/router');
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});