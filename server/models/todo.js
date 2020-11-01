'use strict';
const {
  Model
} = require('sequelize');
const formatDate = require('../helpers/formatDate')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description is required'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status is required'
        },
        allowNull: {
          args: false,
          msg: 'Status cannot be empty!'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'Please input a valid date'
        }, 
        isAfter: {
          args: formatDate(new Date(), -1),
          msg: `You cannot set Due Date to past date!`
        }
      }
    }, 
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate: (todo, options) => {
        todo.due_date = formatDate(new Date(todo.due_date))
      }
    }
  });
  return Todo;
};