const router = require('express').Router();
const NewsController = require("../controllers/NewsController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", NewsController.getNews);

module.exports = router;