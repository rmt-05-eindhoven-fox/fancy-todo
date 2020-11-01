'use strict';
const {
  Model, ValidationError
} = require('sequelize');
const emailVerifier = require('../helpers/verifyEmail');
const { hashPassword } = require('../helpers/hash');
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
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: `You already have an account`
      },
      validate: {
        notEmpty: {
          msg: `Email is required`
        },
        isEmail: {
          msg: `Email must be in example@mail.com format`
        }        
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Password is required`
        },
        len: {
          args: [6],
          msg: `Password must be more than 5 character`
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Name is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password);
      },
      afterValidate: async (user) => {
        try {
          await emailVerifier(user.email);
        } catch (error) {
          // console.log(error);
          throw error;
        }
      }
    }
  });
  return User;
};