const Controllers = require('../controllers/control')
const router = require("express").Router()


router.get("/show", Controllers.showAll)
router.post("/create", Controllers.create)
router.get("/:id", Controllers.showById)
router.put("/:id", Controllers.editTodo)
router.patch("/status/:id", Controllers.editStatus)
router.delete("/:id", Controllers.delete)

module.exports=router