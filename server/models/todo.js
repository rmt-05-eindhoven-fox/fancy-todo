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
      Todo.belongsTo(models.User, { foreignKey: "UserId" })
    }
  };
  Todo.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: "Please enter a title!"
        },
        notEmpty: {
          arg: true,
          msg: "Please enter a title!"
        }
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: "Please enter a description!"
        },
        notEmpty: {
          arg: true,
          msg: "Please enter a description!"
        }
      }
    },
    status: { 
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: "Please enter a status!"
        },
        notEmpty: {
          arg: true,
          msg: "Please enter a status!"
        },
      }
    },
    due_date: { 
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notNull: {
          args: true,
          msg: "Please enter a due_date!"
        },
        notEmpty: {
          arg: true,
          msg: "Please enter a due_date!"
        },
        isAfter: {
          args: `${new Date(new Date().setDate(new Date().getDate()-1))}`,
          msg: "Can't enter a date that has passed!"
        }
      } 
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: "Please enter a UserId!"
        },
        notEmpty: {
          arg: true,
          msg: "Please enter a UserId!"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};