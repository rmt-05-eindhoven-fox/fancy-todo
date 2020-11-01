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
      // Discord username optional
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
            // validasi is email masih bocor
            isEmail: {
               args: true,
               msg: "Not a valid email"
            },
            notNull: {
               args: true,
               msg: 'Email is required'
            },
         },
         unique: {
            args: true,
            msg: 'Email already in use'
         },
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {
               args: true,
               msg: 'Password is required'
            }
         }
      },
   }, {
      sequelize,
      modelName: 'User',
   });

   User.beforeCreate((instance, option) => {
      instance.password = hashPassword(instance.password)
   })
   return User;
};