const express = require('express');
const router = express.Router();
const controller = require('../controllers/MemberController')
const authorization = require("../middlewares/authorization")
const authentication = require("../middlewares/authentication")

router.use(authentication)
router.post('/', authorization,controller.Create)
router.delete('/:projectid/:userid',authorization, controller.Delete)

module.exports = router 