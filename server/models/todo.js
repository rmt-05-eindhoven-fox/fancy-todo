'use strict';
const {
  Model, ValidationError
} = require('sequelize');
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
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is require, cannot be empty!'
        },
        notNull: {
          args: true,
          msg: 'Title is required, cannot be null!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING
    },

    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: "due date is required, cannot be empty!"
        },
        isDate: {
          args: true,
          msg: 'due date mus valid date!'
        }
      }
    }
  }, {
    sequelize,
    validate: {
      dueDateCheck() {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (Date.parse(this.due_date) < yesterday) {
          throw new ValidationError('Due date cannot be set to last date!');
        }
      }
    },
    hooks: {
      beforeCreate(todos) {
        todos.status = 'pending';
      }
    },
    modelName: 'Todo',
  });
  return Todo;
};