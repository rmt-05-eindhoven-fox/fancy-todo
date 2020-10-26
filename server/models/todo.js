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
    description: DataTypes.STRING,
    status: {
      type : DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status is required!'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isYesterday(value){
          if(new Date(value) < new Date()){
            throw new ValidationError(`please input future time!`)
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.beforeCreate((instance, options)=>{
    instance.status = false
  })
  return Todo;
};