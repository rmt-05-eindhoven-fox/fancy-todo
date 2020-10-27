'use strict';
const {
  Model
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
      Todo.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is required!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description is required!'
        },
      }
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
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    validate: {
      dueDateCheck() {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (Date.parse(this.due_date) < yesterday) {
          throw new ValidationError('Date must be valid!');
        }
      }
    },
    hooks: {
      beforeCreate(todos) {
        todos.status = 'Unfinished';
      }
    },
    modelName: 'Todo',
  });
  return Todo;
};