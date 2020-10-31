const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js")

class UserController {
	static async register(req, res, next) {
		try {
			const payload = {
				email: req.body.email,
				password: req.body.password
			}

			const user = await User.create(payload);

			res.status(201).json({
				id: user.id,
				email: user.email
			});

		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const payload = {
				email: req.body.email,
				password: req.body.password
			}

			const user = await User.findOne({
				where: {
					email: payload.email
				}
			});

			if (!user) { //user not found
				throw { name: "InvalidUserPassword" }

			} else if (!comparePassword(payload.password, user.password)) { //user found, password not matched
				throw { name: "InvalidUserPassword" }

			} else { //email & pass matched
				const access_token = signToken({
					id: user.id,
					email: user.email
				});

				res.status(200).json({
					access_token
				});
			}

		} catch (err) {
			next(err);
		}
	}
}

module.exports = UserController;