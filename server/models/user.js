'use strict';
const {
  Model
} = require('sequelize');
const Bcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: "userFK" })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Not a valid email"
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, option) {
        if(instance.password.length < 6) throw new Error('Minimal password length is 6')
        instance.password = Bcrypt.salt(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};