const router = require('express').Router()
const NotificationController = require('../controllers/notificationController')
const notificationAuthorization = require('../middlewares/notificationAuthorization')

router.get('/', NotificationController.findAll)
router.delete('/:id', notificationAuthorization, NotificationController.delete)

module.exports = router