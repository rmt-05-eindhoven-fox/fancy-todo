"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
		}
	}
	Todo.init({
    title: {
      type:DataTypes.STRING,
      validate:{
				notEmpty:{
					args:true,
					msg:`Input your todo title please!`
				}
      }
    },
			description: {
        type: DataTypes.STRING,
			      validate: {
        		notEmpty: {
          		args: true,
          		msg: `Please input your todo description!`
        		}
          }
        },
			status: DataTypes.STRING,
			due_date:  {
      type: DataTypes.DATE,
      validate: {
        isDate(values) {
          if (values < new Date()) {
            throw new Error(`Invalid date input`)
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  },
		{    
    //   hooks: {
    //   beforeCreate: (todos, options) => {
    //     todos.status = 'undone'
    //   }
    // },
			sequelize,
			modelName: "Todo",
		}
	);
	return Todo;
};
