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
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
    // due_date: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   validate: {
    //     isDate: {
    //       args: true,
    //       msg: "input valid date!"
    //     },
    //     isAfter: {
    //       args: new Date(),
    //       msg: "Don't make a plan in the past!"
    //     }
    //   }
    // } 
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};