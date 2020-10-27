'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: "UserId" })
    }
  };
  User.init({
    email: { 
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: "Please enter email!"
        },
        notEmpty: {
          arg: true,
          msg: "Please enter email!"
        },
        isEmail: {
          args: true,
          msg: 'That is an invalid email format!'
        }
      },
      unique: {
        args: true,
        msg: 'Oops! Email address already in use!'
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: "password is required!"
        },
        notEmpty: {
          arg: true,
          msg: "Please enter password!"
        },
        len: {
          args: [6, 20],
          msg: 'Must be between 6 to 20 characters!'
        }
      }
    }
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