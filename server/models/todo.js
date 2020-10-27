'use strict';

const getDateStr = require('../helpers/getDateStr')

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfter: {
          args: getDateStr(),
          msg: `Due date must after ${getDateStr()}`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // 'Actors' would also work
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate(instance, option) {

      }
    }
  });
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      foreignKey: 'UserId'
    })
  };
  return Todo;
};