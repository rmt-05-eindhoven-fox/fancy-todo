
require('dotenv').config()

const cors = require('cors')
const compression = require('compression');
const express = require('express')
const router = require('./routers')
const app = express()
const port = process.env.PORT || 8080
const errorHandler = require('./middlewares/errorHandler')
const cron = require('node-cron');

// Keep the server from sleeping by pinging every 29 minutes
const {keepAlive} = require('./helper/keepAlive')

// Background job to get background photos from Unsplash every 2 minutes
const {getPhotos} = require('./helper/get_photos')

app.use(cors())
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
app.use(errorHandler)

cron.schedule('0 */2 * * *', function () {
   getPhotos()
});

cron.schedule('*/29 * * * *', function () {
   keepAlive()
});

app.listen(port, () => {
   console.log(`Server started on http://localhost:${port}`);
})

/* PERSONAL NOTES
to run the server + bot

npm start
*/