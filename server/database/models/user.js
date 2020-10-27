'use strict';
const {
   Model
} = require('sequelize');

const {
   hashPassword
} = require('../../helper/bycrypt')

module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         User.hasMany(models.Todo, {foreignKey: 'UserId'})
      }
   };
   User.init({
      username: {
         type: DataTypes.STRING,
         unique: true,
         validate: {
            is: {
               args: /^((.+?)#\d{4})/,
               // args: /<(.*)#(\d{4})>/g,
               msg: "Please provide valid Discord Username i.e. John#1234"
            },
         }
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: {
               args: true,
               msg: "Email is required!"
            },
            isEmail: {
               args: true,
               msg: "Not a valid email!"
            },
         },
         unique: {
            args: true,
            msg: 'Email already in use!'
         },
      },
      password: DataTypes.STRING
   }, {
      sequelize,
      modelName: 'User',
   });

   User.beforeCreate((instance, option) => {
      instance.password = hashPassword(instance.password)
   })
   return User;
};