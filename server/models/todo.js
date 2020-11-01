'use strict';

const date = new Date()
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
      Todo.belongsTo(models.User, {foreignKey: "UserId"})
    }
  };
  Todo.init({
    title: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       notEmpty: {
         msg: "Input Title"
       }
     }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "Input Description"
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Input Due Date"
        },
        isAfter: {
          args: new Date(date.setDate(date.getDate()-1)).toDateString(),
          msg: "Due date cant be the past time"
        }
      }
  }, 
  UserId: DataTypes.INTEGER
}, 
  {
    hooks: {
      beforeCreate(todo) {
        todo.status = false
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};