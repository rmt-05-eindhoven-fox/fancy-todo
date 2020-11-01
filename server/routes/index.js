const auth = require('../middleware/authentication');
const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    connection: 'Connection OK'
  })
})

router.use('/users', userRouter);
router.use(auth); 
router.use('/todos', todoRouter);

module.exports = router;