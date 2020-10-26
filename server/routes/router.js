const router = require("express").Router()
const Controller = require('../controllers/control')
const todoRouter = require('./todo')

router.get('/', Controller.landingPage)
router.use('/todos', todoRouter)

module.exports=router