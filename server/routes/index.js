const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    connection: 'Connection OK'
  })
})

router.use('/todos', todoRouter);
router.use('/users', userRouter);

module.exports = router;