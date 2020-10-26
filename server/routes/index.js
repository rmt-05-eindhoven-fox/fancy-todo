const todoRouter = require('./todoRouter');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    connection: 'Connection OK'
  })
})

router.use('/todos', todoRouter);

module.exports = router;