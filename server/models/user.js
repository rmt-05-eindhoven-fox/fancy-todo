'use strict';
const {
  Model, ValidationError
} = require('sequelize');
const Bcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: "userFK" })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Not a valid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 6,
          msg: 'Password length minimum 6'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, option) {
        instance.password = Bcrypt.salt(instance.password)
      },
      beforeValidate(data, option) {
        data.email = data.email.toLowerCase()
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};