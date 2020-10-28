'use strict';
const {
  Model
} = require('sequelize');

const {
  encode
} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email is already registered'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `Email is require, can't be empty!`,
        },
        isEmail: {
          args: true,
          msg: 'Email format please!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,

      validate: {
        notEmpty: {
          args: true,
          msg: `Minimum 6 character, can't be empty!`
        },

        len: {
          args: [6, 10],
          msg: 'Minimum 6 character'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = encode(user.password)
      },
      afterCreate: (user) => {
        delete user.password
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};