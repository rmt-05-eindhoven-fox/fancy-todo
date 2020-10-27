'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helper/bycript');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo);
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Username already registered'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `Username is requiere, can't be empty!`
        },
        len: {
          args: [6],
          msg: 'Username minimal 6 character'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already registered'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `Email is requiere, can't be empty!`
        },
        isEmail: {
          args: true,
          msg: 'Email must be valid an email address!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password is requiere, can't be empty!`
        },
        len: {
          args: [8],
          msg: 'Password minimal 8 character'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        const hashPassword = encrypt(user.password);
        user.password = hashPassword;
      },

      afterCreate(user) {
        delete user.dataValues["password"];
        delete user.dataValues["createdAt"];
        delete user.dataValues["updatedAt"];
      }
    },
    modelName: 'User',
  });
  return User;
};