'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require("../helper/bcrypt.js")
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
      allowNull: false,
      validate: {
        isUnique(email, next) {
          User.findOne({
            where: {
              email: email
            }
          })
            .then(data => {
              // console.log({ data })
              if (data) {
                next('Email address already in use!'); 
              } else {
                next()
              }
            })
            .catch(err => {
              next(err)
            })
        },
        notEmpty: {
          args: true,
          msg: 'password is a required field'
        },
        notNull: {
          args: true,
          msg: 'password is a required field'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password is a required field'
        },
        notNull: {
          args: true,
          msg: 'password is a required field'
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
