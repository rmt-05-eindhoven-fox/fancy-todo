"use strict";
const { Model } = require("sequelize");

const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Todo)
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: {
						args: true,
						msg:
							"The email you entered is invalid or is already in our system.",
					},
				},
			},

			password: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [5, 10],
						msg: "The password length should be between 5 and 10 characters.",
					},
				},
			},
		},
		{
			hooks: {
				beforeCreate(user) {
					user.password = hashPassword(user.password);
				},
			},
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
