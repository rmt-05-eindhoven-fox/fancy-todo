const router = require("express").Router()
const userController = require("../controllers/user.controller")
router.post("/register", userController.register)
router.post("/login", userController.login)


// routing untuk google 
router.post("/googleLogin", userController.googleLogin)
module.exports = router