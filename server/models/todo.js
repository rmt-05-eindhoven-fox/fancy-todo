'use strict';

const getDateStr = require('../helpers/getDateStr')

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title required'
        },
        len: {
          args: [2, 40],
          msg: 'Title length min 2, max 40'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description required'
        },
        len: {
          args: [2, 255],
          msg: 'Description length min 2 & max 255'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Status required'
        },
        isIn: {
          args: [['checked', 'unchecked']],
          msg: "Status must either 'checked' or 'unchecked'"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: `Due date required and must be correct date format`
        },
        isAfter: {
          args: getDateStr(),
          msg: `Due date must after ${getDateStr()}`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', 
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
    // hooks: {
    //   beforeCreate(instance, option) {

    //   }
    // }
  });
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      foreignKey: 'UserId'
    })
  };
  return Todo;
};