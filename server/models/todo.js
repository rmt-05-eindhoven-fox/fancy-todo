'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ToDo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      //   isAfter: {
      //     args: new Date(),
      //     msg: `Only allow the date after today`
      //   }
      // }
    }
  }, {
    hooks: {
      // beforeCreate: 
    },
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};