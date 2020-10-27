require('dotenv').config()

const compression = require('compression');
const express = require('express')
const router = require('./routers')
const app = express()
const port = process.env.PORT || 8080

app.use(express.urlencoded({
   extended: true
}))
app.use(express.json())

const shouldCompress = (req, res) => {
   if (req.headers['x-no-compression']) {
      return false;
   }

   return compression.filter(req, res);
};

app.use(compression({
   filter: shouldCompress,
   threshold: 0
}));

app.use('/', router)

app.listen(port, () => {
   console.log(`Server started on http://localhost:${port}`);
})