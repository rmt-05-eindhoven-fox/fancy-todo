const router = require('express').Router();
const todoController = require('../Controller/todoController.js');
const { authentication, authorization } = require('../middleware/auth.js');

router.use(authentication);
router.post('/', todoController.create);
router.get('/', todoController.showAll);
router.get('/:id', todoController.showOne);
router.put('/:id', authorization, todoController.updateOne);
router.patch('/:id', authorization, todoController.updateStatus);
router.delete('/:id', authorization, todoController.deleteOne);

module.exports = router;