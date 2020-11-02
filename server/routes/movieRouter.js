const router = require('express').Router();
const movieController = require('../Controller/movieController.js');

router.get('/popular', movieController.findPopularMovie);

module.exports = router;