'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const {hashPassword} = require('../helpers/bcrypt')
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo, {
        foreignKey: "UserId"
      })
    }
  };
  User.init({
    username: { 
      type: DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    email: { 
      type: DataTypes.STRING,
      validate:{
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook("beforeCreate", (instance, options) => {
    instance.password = hashPassword(instance.password);
  })
  return User;
};