'use strict';
const {
  Model
} = require('sequelize');
const { Bcrypt } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ToDo, { foreignKey: 'id' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email Cant Be Empty!'
        },
        isEmail: {
          args: true,
          msg: 'Please Insert Email!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password Cant Be Empty!'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = Bcrypt.hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};