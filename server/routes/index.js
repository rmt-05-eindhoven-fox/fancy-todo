const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const homeController = require("../controllers/homeController");

router.get("/", homeController.homepage);


router.post("/todos", todoController.create);
router.get("/todos", todoController.viewAll);
router.get("/todos/:id", todoController.viewById);
router.put("/todos/:id", todoController.updateAll);
router.patch("/todos/:id", todoController.updateStatus);
router.delete("/todos/:id", todoController.delete);

module.exports = router;