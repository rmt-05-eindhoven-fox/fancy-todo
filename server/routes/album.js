const router = require('express').Router()
const AlbumController = require('../controllers/albumControllers')

router.get('/', AlbumController.findAlbum)


module.exports = router