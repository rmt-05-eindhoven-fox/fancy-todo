'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Insert a valid Email !'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5],
          msg: 'Password min. 5 characters!'
        },
        notContains: {
          args: ' ',
          msg: 'Password may not contain space!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};