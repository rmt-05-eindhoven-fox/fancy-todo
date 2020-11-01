'use strict';
const moment = require("moment")
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'You must fill the title'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'You must fill the title'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'You must fill the title'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'You must fill the status'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'You must fill the title'
      },
      validate: {
        isAfter: {
          args: moment().subtract(1, 'days').format().split('T')[0],
          msg: `Due date must be after ${moment().subtract(1, 'days').format().split('T')[0]}`
        },
        notEmpty: {
          args: true,
          msg: 'You must fill the due date'
        },
        isDate: {
          args: true,
          msg: 'Format must be mm/dd/yyyy'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};