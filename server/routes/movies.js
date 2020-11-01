const router = require('express').Router()
const Controller = require('../controller/ControllerMovie')

router.get('/popular', Controller.getPopularMovie)

module.exports = router