const router = require('express').Router();
const QuoteController = require("../controllers/QuoteController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", QuoteController.getQuote);

module.exports = router;