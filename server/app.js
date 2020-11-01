require('dotenv').config();

const express = require('express');
const cors = require('cors')
const router = require('./routers/index');
const app = express();
const PORT = 3000;
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`This app listening at http://localhost:${PORT}`);
})