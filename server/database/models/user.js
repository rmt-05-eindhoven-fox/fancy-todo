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
         // define association here
      }
   };
   User.init({
      username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            notEmpty: {
               args: true,
               msg: "Username is required!"
            },
            is: {
               args: /^[a-zA-Z0-9-_]+$/,
               msg: "Username must contain only a combination of alphabets, numbers, and dashes/underscore!"
            },
            len: {
               args: [6,32],
               msg: `Useername must be between 6-32 characters.`
            },
         }
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            notEmpty: {
               args: true,
               msg: "Email is required!"
            },
            isEmail: {
               args: true,
               msg: "Not a valid email!"
            },
         }
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