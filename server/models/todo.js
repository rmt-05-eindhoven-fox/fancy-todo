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
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title should not be empty'
        },
        notNull: {
          args: true,
          msg: 'title should not be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'description should not be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'status should not be empty'
        }
      }
    },
    due_date: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'due_date should not be empty'
        },
        isValid(value){
          const currentTime = new Date()
          const schedule = new Date(value)
          if((schedule - currentTime) < 0){
            throw new Error('Should be greater than current time')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, options){
        instance.status = false
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};