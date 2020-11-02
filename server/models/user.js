'use strict';

const {hashPassword} = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
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
        foreignKey: 'UserId'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        notNull: {
          msg: 'Please enter your email.'
        },
        isEmail: {
          args: true,
          msg: 'Wrong email format!'
        },
        isUnique: async function(value, next) {
          let found = await User.findOne({
            where: {
              email: value
            }
          })
          if (found) {
            next('Email already exist!')
          } else {
            next()
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password.'
        },
        len: {
          args: [3, 20],
          msg: 'Password must have length of atleast 3'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {

    }
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ['email']
    //   }
    // ]
  });

  User.beforeCreate((inst, opt) => {
    inst.password = hashPassword(inst.password)
  })
  
  return User;
};