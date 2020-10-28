'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ToDo.belongsTo(models.User)
    }
  };
  ToDo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Due date is required"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }
    , {
      sequelize,
      validate: {
        customDate() {
          if (this.due_date < new Date(' +UTC')) {
            throw new Error("Due date should not in the past time")
          }
        }
      },
      modelName: 'ToDo',
    });
  return ToDo;
};