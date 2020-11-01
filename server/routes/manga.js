const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const MangaController = require("../controllers/manga");

router.use(authentication);

router.get("/", MangaController.showManga);
// router.get("/", TodoController.showTodos)
// router.post("/", TodoController.createTodo)

router.use("/:id", authorization);
// router.get("/:id", TodoController.showTodo)
// router.put("/:id", TodoController.updateTodo)
// router.patch("/:id", TodoController.updateTodoStatus)
// router.delete("/:id", TodoController.deleteTodo)

module.exports = router;
