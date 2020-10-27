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
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Title cannot be empty" }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isValidDate(value) {
          const dateNow = new Date()
          const inputDate = new Date(value)
          if (dateNow.getFullYear() > inputDate.getFullYear() ||
            dateNow.getMonth() >= inputDate.getMonth()) {
            if (dateNow.getDate() > inputDate.getDate()) {
              throw new Error('Date must be greater than today')
            }
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.beforeCreate((instance, option) => {
    instance.status = false
  })
  return Todo;
};