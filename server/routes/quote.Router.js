const router = require("express").Router()
const Quote = require("../controllers/quote.controller")


router.get("/randomQuote", Quote.randomQuote)

module.exports = router