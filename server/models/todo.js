'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todo.belongsTo(models.user, { foreignKey: 'creator_id'})
    }
  };
  todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        },
        notNull: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required"
        },
        notNull: {
          args: true,
          msg: "Description is required"
        }
      }
    },
    status: {
      type: DataTypes.ENUM,
      allowNull:false,
      values: ['New', 'Inprogress','Done'],
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is required"
        },
        notNull: {
          args: true,
          msg: "Status is required"
        },
        isIn:{
          args:[['New', 'Inprogress','Done']],
          msg:"todo status should be New, Inprogress or Done "
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: "date is required"
        },
        notNull: {
          args: true,
          msg: "date is required"
        },
        isDate: {
          args: true,
          msg: "Input date must be date"
        },
        customValidator(value){
          let input = new Date(value)
          if(input.getFullYear() - new Date().getFullYear() < 0){
            throw new Error('Date cannot last year')
          }
          else if(input.getFullYear() - new Date().getFullYear() === 0){
            if(input.getMonth() - new Date().getMonth() < 0){
              throw new Error('Date cannot last month')
            }
            else if(input.getMonth() - new Date().getMonth() === 0){
              if(input.getDate() - new Date().getDate() < 0){
                throw new Error('Date cannot yesterday and must be greater than today')
              }
            }
          }
        }
      }
    },
    creator_id: DataTypes.INTEGER,
    project_id: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Project Id is required"
        },
        notNull: {
          args: true,
          msg: "Project Id is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
}; 