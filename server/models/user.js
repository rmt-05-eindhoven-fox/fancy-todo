'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: "Email is invalid" },
        isUnique(value) {
          return User.findAll({ where: { email: value } })
            .then(userFound => {
              if (userFound.length > 0) {
                throw new Error(`email ${value} is already registered`)
              }
            })
        },
        notNull: { msg: "Oops! Email is required" },
        notEmpty: { msg: "Yikes! Email should not be empty" }
      }, allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Oops! Username is required" },
        notEmpty: { msg: "Yikes! Username should not be empty" }
      }, allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Oops! Password should not be empty" },
        notNull: { msg: "Yikes! Password is required" },
        min: {
          args: 6,
          msg: "Oops! Minimum 6 characters!"
        }
      }, allowNull: false
    }
  }, {
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password)
        }
      }, sequelize
    })
  User.associate = function (models) {
    User.hasMany(models.Todo)
    User.belongsToMany(models.Project, { through: models.ProjectUser })
  };
  return User;
};
