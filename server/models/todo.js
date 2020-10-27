'use strict';
const {
  Model
} = require('sequelize');

const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {

    static associate(models) {
      // define association here
      Todo.belongsTo( models.User )
    }
  };
  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Title can't be empty`
        },
        notNull : {
          msg : `Title property is missing`
        }
      }

    },
    description: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Description can't be empty`
        },
        notNull : {
          msg : `Description property is missing`
        }
      }
    },
    status: DataTypes.STRING,

    due_date: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        isDate : true,
        notNull : {
          msg : `Due date property is missing`
        },
        notEmpty : {
          msg : `Due Date can't be empty`
        },
        isPast(inputDate) {
          let dateNow = new Date()
          inputDate = Date.parse(inputDate)
          dateNow = Date.parse(dateNow)

          if( inputDate < dateNow ) {
            throw new Error(`Date can't be less than current date`)
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