const { Todo } = require('../models');

class TodoController {

  static findAll(req, res){
  Todo.findAll()
    .then(data => [
      res.status(201).json(data)
    ])
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static create(req, res){
  let obj = {
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.due_date,
    status: req.body.status
  }
  Todo.create(obj)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static findId(req, res){
  const id = +req.params.id;

  Todo.findByPk(id)
    .then(data => {
      if(data){
        res.status(201).json(data);
      } else {
        throw res.status(404).json({error : "not found"});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static update(req, res){
  const id = +req.params.id;
  const obj = {
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.due_date,
    status: req.body.status
  }

  Todo.update(obj, { where : {'id' : id}, returning: true})
    .then(data => {
      if(data[1][0]){
        res.status(201).json(data[1][0]);
      } else {
        throw res.status(404).json({error : "not found"});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static updateStatus(req, res){
  const id = +req.params.id;
  const obj = {
    status: req.body.status
  }

  Todo.update(obj, { where : {'id' : id}, returning: true})
    .then(data => {
      if(data[1][0]){
        res.status(201).json(data[1][0]);
      } else {
        throw res.status(404).json({error : "not found"});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static delete(req, res){
    const id = +req.params.id;

    Todo.destroy({where : {'id': id}})
      .then(data => {
        if(data){
          res.status(201).json({message : 'todo success to delete'})
        } else {
          res.status(404).json({error : "not found"});
        }
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }

}

module.exports = TodoController