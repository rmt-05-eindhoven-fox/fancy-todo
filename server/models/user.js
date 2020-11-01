'use strict';
const {
  Model
} = require('sequelize');

const verifyEmail = require('../helpers/emailVerifier')
const { hashPassword, comparePassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true, 
          msg: 'please input a valid email address'
        },
        notEmpty: {
          args: true,
          msg: 'email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password is required'
        }, 
        len: {
          args: [8],
          msg: `Password must consist of at least 8 characters!`
        }
      }

    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      },
      afterValidate: async (user) => {
        try {
          await verifyEmail(user.email)
        }catch(error) {
          throw error
        }
      }
    },

    sequelize,
    modelName: 'User',
  });
  return User;
};