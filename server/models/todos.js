'use strict';
const {
  Model
} = require('sequelize');

// const{ } =require('../helper/bcrypt.js')

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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type:DataTypes.DATE,
      validate: {
        isGreaterThanDate(date){
          var pickedDate = new Date(date)
          var todaysDate = new Date()

          if (pickedDate < todaysDate === true) {
            throw new Error("input tanggal error");
          } else {
            return date 
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