const router = require('express').Router()

const ProjectController = require('../controllers/ProjectController')
const projectAuthorization = require('../middlewares/projectAuthorization')

router.get('/', ProjectController.getUserProjects)
router.post('/', ProjectController.postAddProject)

router.patch('/:id', projectAuthorization, ProjectController.patchEditProject)
router.delete('/:id', projectAuthorization, ProjectController.deleteProject)

module.exports = router