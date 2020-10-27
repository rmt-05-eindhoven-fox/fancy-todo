const express = require("express");
const router = express.Router();
const todosRouter = require("./todosRouter");
const userRouter = require("./userRouter");

router.use(userRouter);
router.use("/todos", todosRouter);

module.exports = router;
