'use strict'

const { Todo } = require('../models')

class TodosController {
  static async getTodos(req, res){
    try {
      const data = await Todo.findAll()
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async postTodos(req, res){
    let objparam = {
      title: '',
      description: 'aapa aja boleh3',
      status:'Ongoing',
      due_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    try {
      const data = await Todo.create(objparam, { returning: true })
      res.status(201).json(data);
    } catch (err) {
      if(err.name === 'SequelizeValidationError'){
        res.status(400).json(err);  
      }
      else{
        res.status(500).json(error)
      }
    }
  }

  static async getTodosbyId(req,res){
    let idparams = req.params.id;
    try{
      const data = await Todo.findByPk(idparams);
      if(!data){
        res.status(404).json('not found');
      } else{
        res.status(200).json(data);
      }
    } catch(err) {
      res.status(500).json(err);
    }
  }

  static async putTodos(req, res){
    let idparams = req.params.id;
    let objparam = {
      title: 'todos4',
      description: 'aapa aja boleh3',
      status:'',
      due_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    try{
      const data = await Todo.update(objparam, {
        where: { id: idparams }
      });
      if(!data[0]){
        res.status(404).json('not found');
      }
      else{
        res.status(200).json(data);
      }
    } catch(err){
      if(err.name === 'SequelizeValidationError'){
        res.status(400).json(err);  
      }
      else {
        res.status(500).json(err);
      }
    }
  }

  static async patchTodos(req, res){
    let idparams = req.params.id;
    let objparam = {
      status: 'completed'
    }
    try{
      const data = await Todo.update(objparam, {
        where: { id: idparams }
      })
      if(!data[0]){
        res.status(404).json('not found');
      }
      else{
        res.status(200).json(data);
      }
    } catch(err){
      if(err.name === 'SequelizeValidationError'){
        res.status(400).json(err);  
      }
      else{
        res.status(500).json(err);
      }
    }
  }

  static async deleteTodos(req, res){
    let idparams = req.params.id;
    try {
      const data = await Todo.destroy({ where: { id: idparams }});
      if(!data){
        res.status(404).json(data)
      }
      else {
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = TodosController;