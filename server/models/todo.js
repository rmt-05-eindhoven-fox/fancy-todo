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
      Todo.belongsTo(models.User, {foreignKey: 'userId'})
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Please use date format'
        },
        notNull: {
          msg: 'Due date is required'
        },
        notEmpty: {
          msg: 'Due date is required'
        },
        isAfter: {
          args: new Date(new Date().setDate(new Date().getDate() - 1)).toString(),
          msg: 'Date must be today or greater'
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate(Todo) {
        Todo.status = false
      }
    }
  });
  return Todo;
};