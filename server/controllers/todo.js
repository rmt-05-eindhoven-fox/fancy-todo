const { Todo } = require('../models');

class TodoController {

  static findAll(req, res, next){
    const userId = req.loginUser.id;
    Todo.findAll({ where : {'UserId': userId, 'status': false}})
      .then(data => [
        res.status(201).json(data)
      ])
      .catch(err => {
        next(err)
      })
  }

  static findTrue(req, res, next){
    const userId = req.loginUser.id;
    Todo.findAll({ where : {'UserId': userId, 'status': true}})
      .then(data => [
        res.status(201).json(data)
      ])
      .catch(err => {
        next(err)
      })
  }

  static create(req, res, next){
    const userId = req.loginUser.id;

    let obj = {
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date,
      status: false,
      UserId: userId
    }
    Todo.create(obj)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        next(err);
      })
  }

  static findId(req, res, next){
    const id = +req.params.id;

    Todo.findByPk(id)
      .then(data => {
        if(data){
          res.status(201).json(data);
        } else {
          throw next(err);
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next){
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
          throw next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateStatus(req, res, next){
    const id = req.params.id;
    const obj = {
      status: true
    }

    Todo.update(obj, { where : {id}})
      .then(data => {
        if(data[0]){
          res.status(201).json(data[0]);
        } else {
          throw next(err);
        }
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  }

  static delete(req, res, next){
    const id = +req.params.id;

    Todo.destroy({where : {'id': id}})
      .then(data => {
        if(data){
          res.status(201).json({message : 'todo success to delete'})
        } else {
          next(err);
        }
      })
      .catch(err => {
        next(err);
      })
  }

}

module.exports = TodoController