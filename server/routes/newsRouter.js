const router = require('express').Router()
const NewsController = require('../controllers/newsController')

router.get('/', NewsController.getHeadlines)
router.post('/', NewsController.detailNews)

module.exports = router