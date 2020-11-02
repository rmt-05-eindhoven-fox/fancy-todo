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
      Todo.belongsTo(models.User);
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args: true,
          msg: 'Title is required!!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: 'Description is required!!'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status is Required!!!'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Due Date is Required!!!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo'
  });
  return Todo;
};