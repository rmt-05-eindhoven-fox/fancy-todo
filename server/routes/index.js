const express = require("express")
const TodoRouter = require("./todo")
const UserRouter = require("./user")
const ZomatoRouter = require("./zomato")
const router = express.Router()

router.get("/", (req, res) => {
	res.send(`test`)
})
router.use("/zomato", ZomatoRouter)
router.use("/users", UserRouter)
router.use("/todos", TodoRouter)

module.exports = router