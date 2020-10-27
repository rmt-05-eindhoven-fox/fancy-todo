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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
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
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};