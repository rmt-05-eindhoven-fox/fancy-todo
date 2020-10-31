const router = require('express').Router()
const Controller = require('../controller/controllerUser')

router.get('/', Controller.getUsers)
router.post('/register', Controller.postUsers)
router.post('/login', Controller.postLogin)
router.post('/googleLogin', Controller.postGoogleLogin)
// router.patch('/:id', Controller.patchUsers)
// router.put('/:id', Controller.putUsers)

module.exports = router