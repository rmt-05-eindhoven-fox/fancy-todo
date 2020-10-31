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
      Todo.belongsTo(models.User, { foreignKey: 'userFK' })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title is required"
        },
        notIn: {
          args: [[true, false]],
          msg: "Wrong title input"
        },
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: false,
          msg: "Wrong date input"
        },
        tanggal(value) {
          let input = new Date(value)
          if(input.getFullYear() - new Date().getFullYear() < 0) {
            throw new Error('Date must to greater than now')
          } 
          else if(input.getFullYear() - new Date().getFullYear() === 0) {
            if(input.getMonth() - new Date().getMonth() < 0) {
              throw new Error('Date must to greater than now')
            }
            else if(input.getMonth() - new Date().getMonth() === 0) {
              if(input.getDate() - new Date().getDate() < 0) {
                throw new Error('Date must to greater than now')
              }
            }
          }
        }
      }
    },
    userFK: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(data) {
        data.status = false
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};