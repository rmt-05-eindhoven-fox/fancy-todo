'use strict';
const {
   Model
} = require('sequelize');

const {checkIsAfter} = require('../../helper/date')

module.exports = (sequelize, DataTypes) => {
   class Todo extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   };
   Todo.init({
      title: {
         type: DataTypes.STRING,
         validate: {
           notEmpty: {
             args: true,
             msg: 'Title is required.'
           }
         }
       },
      description: {
         type: DataTypes.STRING,
         validate: {
           notEmpty: {
             args: true,
             msg: 'Description is required.'
           }
         }
       },
      status: DataTypes.STRING,
      due_date: {
         type: DataTypes.DATE,
         validate: {
            checkDate() {
               if(checkIsAfter(this.due_date)) {
                  throw new Error('Due date must be after today.')
               }
               else if(!checkIsAfter(this.due_date)){
                  throw new Error('Due date must be after today.')
               }
            }
         }
       },
   },{
      sequelize,
      modelName: 'Todo',
   });
   return Todo;
};