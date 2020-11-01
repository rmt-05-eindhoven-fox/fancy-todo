'use strict';
const {
  Model
} = require('sequelize');
const d = new Date();

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User,{foreignKey:"UserId"})
    }
  };
  Todo.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg:'title cannot be empty'
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg:'description cannot be empty'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args: new Date(d.setDate(d.getDate() - 1)).toString(),
          msg: `the date must be today or greater`
        },
        notEmpty:{
          msg: "due date cannot be empty"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate(todo){
        todo.status = false
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};