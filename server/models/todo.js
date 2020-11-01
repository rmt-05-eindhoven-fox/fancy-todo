'use strict';
const {
  Model
} = require('sequelize');

const getToday = require('../helpers/get_date')

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User);
      // define association here
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Required Title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Required Description'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Required Status'
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Required Date'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    validate:{
      compareDate() {
        if(this.due_date < getToday()){
          throw new Error("Due date should not in the past")
        }
      }
    },
    modelName: 'Todo',
  });
  return Todo;
};