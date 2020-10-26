const router = require("express").Router()
const TodosController = require("../controllers/todosController")

router.get("/", TodosController)

module.exports = router