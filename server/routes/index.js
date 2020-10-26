const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    connection: 'OK'
  })
})

router.use('/todos', todoRouter);

module.exports = router;