'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: "UserId",
        targetKey: "id"
      })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true,
      }
    },
    description:{
      type: DataTypes.STRING,
      validate:{
        notEmpty: true,
      }
    },
    status: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true,
      }
    },
    UserId: DataTypes.INTEGER,
    due_date: {
      type: DataTypes.DATE,
      validate:{
        notEmpty: true,
        isDate: true,
        checkDate(value){
          let now = new Date();
          if(value <= now){
            throw new Error("Due date needs to be greater than today")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};