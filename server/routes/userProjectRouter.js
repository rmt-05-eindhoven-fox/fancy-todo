const router = require('express').Router()
const UserProjectController = require('../controllers/userProjectController')

router.post('/', UserProjectController.add)

module.exports = router