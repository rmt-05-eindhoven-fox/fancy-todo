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
    fullname: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Full Name is requiere, can't be empty!`
        },
        notNull: {
          args: true,
          msg: `Full Name is requiere, can't be empty!`
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false,
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
        },
        notNull: {
          args: true,
          msg: `Full Name is requiere, can't be empty!`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
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
        },
        notNull: {
          args: true,
          msg: `Full Name is requiere, can't be empty!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password is requiere, can't be empty!`
        },
        len: {
          args: [8],
          msg: 'Password minimal 8 character'
        },
        notNull: {
          args: true,
          msg: `Full Name is requiere, can't be empty!`
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