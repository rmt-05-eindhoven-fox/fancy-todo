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
        isEmail: {
          args: true,
          msg: 'Wrong email format!'
        },
        notNull: {
          msg: 'Please enter your email.'
        },
        isUnique: async function(value, next) {
          let found = await User.findOne({
            where: {
              email: value
            }
          })
          if (found) {
            next({msg: 'Email used!'})
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