'use strict';
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
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [6, 12],

    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        usernameLength(value) {
          if (value.length < 4 || value.length < 12) {
            throw new Error (`Username must be longer than 4 digit, and less than 12`)
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};