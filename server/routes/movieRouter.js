const router = require('express').Router()
const MovieController = require('../controllers/movieController')

router.get('/popular', MovieController.findPopularMovie)

module.exports = router