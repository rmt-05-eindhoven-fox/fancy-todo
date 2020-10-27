"use strict";
const { Model } = require("sequelize");
const tanggalnow = new Date();
const todayDate = tanggalnow.toString();

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User);
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Jangan kosongkan title",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Jangan kosongkan status",
          },
        },
      },
      due_date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            args: true,
            msg: "Jangan kosongkan due date",
          },
          isBefore: {
            args: todayDate,
            msg: `Gunakan tanggal sebelum hari ini`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
