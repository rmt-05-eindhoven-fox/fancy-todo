'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.project_member, { foreignKey: 'user_id'})
      user.hasMany(models.todo, { foreignKey: 'creator_id'})
    }
  };
  user.init({
    email: {
      type: DataTypes.STRING,
      unique:true,
      validate: {
        isEmail: {
          args: true,
          msg: "invalid email format"
        },
        notEmpty: {
          args: true,
          msg: "email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "password is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  user.beforeCreate((instance, option) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash
  })
  return user;
}; 