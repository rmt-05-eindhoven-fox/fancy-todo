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
      Todo.belongsTo(models.User, { foreignKey: 'UserId'})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is required"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: "date is required"
        },
        isDate: {
          args: true,
          msg: "Input date must be date"
        },
        customValidator(value){
          let input = new Date(value)
          if(input.getFullYear() - new Date().getFullYear() < 0){
            throw new Error('Date cannot last year')
          }
          else if(input.getFullYear() - new Date().getFullYear() === 0){
            if(input.getMonth() - new Date().getMonth() < 0){
              throw new Error('Date cannot last month')
            }
            else if(input.getMonth() - new Date().getMonth() === 0){
              if(input.getDate() - new Date().getDate() < 0){
                throw new Error('Date cannot yesterday and must be greater than today')
              }
            }
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
}; 