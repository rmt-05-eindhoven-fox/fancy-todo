const express = require("express");
const router = express.Router();
const TodosController = require("../controller/TodosController");

router.post("/", TodosController.post);
router.get("/", TodosController.get);
router.get("/:id", TodosController.getOne);
router.put("/:id", TodosController.put);
router.patch("/:id", TodosController.patch);
router.delete("/:id", TodosController.delete);

module.exports = router;
