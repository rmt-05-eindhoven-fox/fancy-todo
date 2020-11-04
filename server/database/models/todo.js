'use strict';
const {
   Model
} = require('sequelize');

const {
   checkIsAfter
} = require('../../helper/date')

module.exports = (sequelize, DataTypes) => {
   class Todo extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         Todo.belongsTo(models.User, {foreignKey: 'UserId'})
      }
   };
   Todo.init({
      title: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               args: true,
               msg: 'Title is required.'
            }
         }
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               args: true,
               msg: 'Description is required.'
            }
         }
      },
      status: DataTypes.STRING,
      due_date: {
         type: DataTypes.DATE,
         allowNull: false,
         validate: {
            notNull: {
               args: true,
               msg: 'Due date is required.'
            },
            validate(date) {
               const now = new Date()
               if (date < now) {
                 throw new Error (`Due date must not exceed today`)
               } 
             }
         }
      },
      UserId: DataTypes.INTEGER
   }, {
      sequelize,
      modelName: 'Todo',
   });
   return Todo;
};