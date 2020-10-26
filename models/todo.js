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
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate:{
        isDate: {
          msg: `Must be a date`
        },
        validate(value) {
          const now = new Date()
          if (value < now) {
            throw new Error(`Due date must be greater than now`)
          } 
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(value) {
        if (!value.status) {
          value.status = `not done`
        }
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};