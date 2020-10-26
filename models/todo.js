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
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'due date must be a date format'
        },
        validate(value) {
          const now = new Date();
          if (value < now) {
            throw new Error ('due date cannot be in past');
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