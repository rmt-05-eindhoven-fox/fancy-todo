'use strict';
const {
  Model
} = require('sequelize');

const { hashingPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email should not be empty'
        },
        notNull: {
          args: true,
          msg: 'Email should not be empty'
        },
        isEmail: {
          args: true,
          msg: 'Check your email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password should not be empty'
        },
        notNull: {
          args: true,
          msg: 'Password should not be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hashingPassword(instance.password)
      }
    }, 
    sequelize,
    modelName: 'User',
  });
  return User;
};