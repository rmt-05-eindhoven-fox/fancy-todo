'use strict';

const { hashPassword } = require("../helpers/password.helper")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ToDo, {foreignKey: "UserId"})
    }
  };
  User.init({
    email:{ 
      type : DataTypes.STRING,
      validate : { 
        isEmail : { 
          args : true, 
          msg : "Email harus sesuai pola"
        }
      }
    },
    password: { 
      type : DataTypes.STRING, 
      allowNull : false,
      validate : {
        len : [5, 20], 
        msg : "Password minimal 5 character"
       }
    },
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};