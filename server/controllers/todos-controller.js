'use strict'

const { Todo } = require('../models');

class TodosController {
  static async getTodos(req, res, next){
    const userId = req.loggedInUser.id;
    try {
      const data = await Todo.findAll({
        where: {
          UserId: userId
        }
      })
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async postTodos(req, res, next){
    let objparam = {
      title: req.body.title,
      description: req.body.description,
      status: 'Uncompleted',
      due_date: new Date(),
      UserId: req.loggedInUser.id
    }
    try {
      const data = await Todo.create(objparam, { returning: true })
      res.status(201).json(data);
    } catch (err) {
      let error = err.errors[0];
      next(error);
    }
  }

  static async getTodosbyId(req, res, next){
    let idparams = req.params.id;
    try{
      const data = await Todo.findByPk(idparams);
      res.status(200).json(data);
    } catch(err) {
      next(err);
    }
  }

  static async putTodos(req, res, next){
    let idparams = req.params.id;
    let objparam = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      updatedAt: new Date()
    }
    try{
      const data = await Todo.update(objparam, {
        where: { id: idparams }
      });
      res.status(200).json(data);
    } catch(err){
      let error = err.errors[0];
      next(error)
    }
  }

  static async patchTodos(req, res, next){
    let idparams = req.params.id;
    let objparam = {
      status: 'completed'
    }
    try{
      const data = await Todo.update(objparam, {
        where: { id: idparams }
      })
      res.status(200).json(data);
    } catch(err){
      let error = err.errors[0];
      next(error);
    }
  }

  static async deleteTodos(req, res, next){
    let idparams = req.params.id;
    try {
      const data = await Todo.destroy({ where: { id: idparams }});
      res.status(200).json('Todo Success to delete!');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodosController;