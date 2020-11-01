'use strict';
const {
  Model
} = require('sequelize');
const getToday = require('../helpers/getToday')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User)
      Todo.belongsTo(models.Project)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is required"
        }
      }
    },
    due_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Due date is required"
        },
        isDate: {
          args: true,
          msg: "Please fill due date with date format"
        },
        isAfter: {
          args: getToday(),
          msg: 'Please fill due date after today'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Project is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo'
  });
  return Todo;
};