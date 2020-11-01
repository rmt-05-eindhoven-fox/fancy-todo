const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const MangaController = require("../controllers/manga");

router.use(authentication);

router.get("/", MangaController.showManga);

module.exports = router;
