const Controllers = require('../controllers/control')
const router = require("express").Router()


router.get("/", Controllers.showAll)
router.post("/", Controllers.create)
router.get("/:id", Controllers.showById)
router.put("/:id", Controllers.editTodo)
router.patch("/:id", Controllers.editStatus)
router.delete("/:id", Controllers.delete)

module.exports=router