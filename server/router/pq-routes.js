'use strict'

const router = require('express').Router();
const QuotesController = require('../controllers/quotes-controller')

router.get('/', QuotesController.getRandomQuotes);

module.exports = router;