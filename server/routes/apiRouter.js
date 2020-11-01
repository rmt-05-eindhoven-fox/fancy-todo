const router = require('express').Router();
const ApiController = require('../controllers/ApiController');

router.get('/holiday', ApiController.getHoliday);

module.exports = router;