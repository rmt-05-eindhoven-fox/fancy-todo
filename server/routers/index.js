const router = require('express').Router()

const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const weatherRouter = require("./weatherRouter");


router.use(userRouter)
router.use(weatherRouter)
router.use('/todos', todoRouter)

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

module.exports = router;