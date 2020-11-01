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
      Todo.belongsTo(models.User);
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.STRING,
      validate: {
        checkDate(){
          let date = this.due_date;
          let temp = date.split('-');
          const inputDate = Number(temp[0]) + Number(temp[1]) + Number(temp[2])
          let now = new Date();
          const nowDate = now.getFullYear() + now.getMonth() + now.getDay() + 1
  
          if(inputDate < nowDate) {
            throw new Error('date is a require field');
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