const express = require("express")
const ZomatoController = require("../controllers/zomato")
const router = express.Router()

router.get('/', ZomatoController.findCuisine)

module.exports = router