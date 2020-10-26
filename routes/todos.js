const router = require('express').Router();
const todoController = require('../Controller/todoController.js');


router.post('/', todoController.create);
router.get('/', todoController.showAll);
router.get('/:id', todoController.showOne);
router.put('/:id', todoController.updateOne);
router.patch('/:id', todoController.updateStatus);
router.delete('/:id', todoController.deleteOne);

module.exports = router;