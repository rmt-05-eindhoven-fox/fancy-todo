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

      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,

      validate: {
        notEmpty: true,

        len: {
          args: [4, 10]
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