const express = require('express');
const router =  express.Router();
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const TodoController = require('../controllers/TodoController');
const UserController = require('../controllers/UserController');
const QuoteController = require('../controllers/QuoteController');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/googleLogin', UserController.googleLogin);

router.use(authentication);

router.get('/todos', TodoController.listTodo);
router.post('/todos', TodoController.postAdd);

router.get('/todos/:id', authorization, TodoController.getTodoByID);
router.patch('/todos/:id', authorization, TodoController.updateStatus);
router.put('/todos/:id', authorization, TodoController.update);
router.delete('/todos/:id', authorization, TodoController.delete);
router.get('/quotes', QuoteController.getQuotes);

module.exports = router;

// router.get('/courses/add', TodoController.getAdd);
// router.post('/courses/add', TodoController.postAdd);

// router.get('/courses/:id/addStudent', TodoController.getAddStudent);
// router.post('/courses/:id/addStudent', TodoController.postAddStudent);

// router.get('/courses/:id/edit', TodoController.getEdit);
// router.post('/courses/:id/edit', TodoController.postEdit);


// router.get('/register', TodoController.getRegister);
// router.post('/register', TodoController.postRegister);

// router.get('/', TodoController.getLogin);
// router.post('/login', TodoController.postLogin);

// router.get('/courses', TodoController.listCourse);
