const Controllers = require('../controllers/control')
const router = require("express").Router()
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")

router.use(authentication)
router.get("/show", Controllers.showAll)
router.post("/create", Controllers.create)

router.get("/:id", authorization, Controllers.showById)
router.put("/:id", authorization, Controllers.editTodo)
router.patch("/status/:id", authorization, Controllers.editStatus)
router.delete("/:id", authorization, Controllers.delete)

module.exports=router