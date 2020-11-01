const express = require('express')
const router = express.Router()
const RandomQuote = require('../controllers/RandomQuote')
const authentication = require('../middlewares/authentication')


router.use(authentication)

router.get('/', RandomQuote.randomizeQuote)


module.exports = router