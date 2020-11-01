const router = require('express').Router()
const ProjectController = require('../controllers/projectController')
const projectAuthorization = require('../middlewares/projectAuthorization')

router.get('/', ProjectController.findAll)
router.post('/', ProjectController.add)

// authorization
router.get('/:id', ProjectController.findOne)
router.put('/:id', projectAuthorization, ProjectController.edit)
router.delete('/:id', projectAuthorization, ProjectController.delete)

router.post('/:id/invite', projectAuthorization, ProjectController.inviteMember)

module.exports = router