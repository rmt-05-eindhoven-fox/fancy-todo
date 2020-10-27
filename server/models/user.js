"use strict";
const { Model } = require("sequelize");
const Helper = require("../helpers/helper");

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
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Masukan alamat email yang valid",
          },
          notEmpty: {
            args: true,
            msg: "Jangan kosongkan email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Jangan kosongkan password",
          },
          len: {
            args: [6, 15],
            msg: "Panjang password minimal 6 sampai 15 karakter",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(instance, options) {
          instance.password = Helper.hashpassword(instance.password);
        },
      },
    }
  );
  return User;
};
