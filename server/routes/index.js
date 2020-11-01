const router = require("express").Router();

const UserController = require("../controllers/user");

const todoRoutes = require("./todo");
const mangaRoutes = require("./manga");

router.use("/todos", todoRoutes);
router.use("/manga", mangaRoutes);
router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.post("/signinGoogle", UserController.signinGoogle);

module.exports = router;
