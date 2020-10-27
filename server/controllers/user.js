const { Todo, User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
	static async register (req, res, next) {
		const { email, password } = req.body
		try {
			const payload = {
				email, password
			}
			
			const newUser = await User.create(payload)
			res.status(201).json({ message: 'Register Success' })
		} catch (err) {
			next(err)
		}
	}

	static async login (req, res, next) {
		const { email, password } = req.body
		try {
			const payload = {
				email, password
			}

			const user = await User.findOne({
				where: { email }
			})

			if (!user) {
				throw { msg: 'Wrong email/password!', status: 401 }
			} else if (!comparePassword(payload.password, user.password)) {
				throw { msg: 'Wrong email/password!', status: 401 }
			} else {
				const access_token = signToken(user.id)
				res.status(200).json({ access_token })
			}
		} catch (err) {
			next(err)
		}
	}
}

module.exports = UserController;
