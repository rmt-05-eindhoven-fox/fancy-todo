'use strict';
const {
  Model
} = require('sequelize');

// const{ } =require('../helper/bcrypt.js')

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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title is a required field'
        },
        notNull: {
          args: true,
          msg: 'title is a required field'
        }
      }

    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'descrition is a required field'
        },
        notNull: {
          args: true,
          msg: 'descrition is a required field'
        }
      }

    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'status is a required field'
        },
        notNull: {
          args: true,
          msg: 'status is a required field'
        }
      }

    },
    due_date: {
      type:DataTypes.DATE,
      validate: {
        isGreaterThanDate(date){
          var pickedDate = new Date(date)
          var todaysDate = new Date()

          if (pickedDate < todaysDate === true) {
            throw new Error("input tanggal error");
          } else {
            return date 
          }
        },
        notEmpty: {
          args: true,
          msg: 'descrition is a required field'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};