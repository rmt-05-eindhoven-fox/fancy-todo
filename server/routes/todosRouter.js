const express = require("express");
const router = express.Router();
const TodosController = require("../controller/TodosController");
const Middleware = require("../middlewares/middleware");

router.use(Middleware.authentication);
router.post("/", TodosController.post);
router.get("/", TodosController.get);
router.get("/:id", Middleware.authorization, TodosController.getOne);
router.put("/:id", Middleware.authorization, TodosController.put);
router.patch("/:id", Middleware.authorization, TodosController.patch);
router.delete("/:id", Middleware.authorization, TodosController.delete);

module.exports = router;
