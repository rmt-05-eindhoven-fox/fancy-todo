'use strict';
const {
  Model
} = require('sequelize');
const dateFormat = require('../helpers/dateFormat');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isBefore: {
          args: dateFormat(new Date(), 1),
          msg: `Date must be before or equals to today's date`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate: (todo, options) => {
        todo.due_date = dateFormat(new Date(todo.due_date));
      },
      afterCreate: (todo, options) => {
        delete todo.dataValues.createdAt;
        delete todo.dataValues.updatedAt;
      },
      afterUpdate: (todo, options) => {
        console.log(todo);
        delete todo.dataValues.createdAt;
        delete todo.dataValues.updatedAt;
      }
    }
  });
  return Todo;
};