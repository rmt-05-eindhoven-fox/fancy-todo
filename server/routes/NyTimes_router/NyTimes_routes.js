const router = require('express').Router()
const NyTimesController = require('../../controller/nytimes')

router.get('/', NyTimesController.articles)

module.exports = router