const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken }  = require("../helpers/jwt");

class UserController {
	static async register(req, res) {
		try {
			const params = {
				email: req.body.email,
				password: req.body.password,
			};
			const user = await User.create(params);
			console.log(user);
			res.status(201).json({
				id: user.id,
				email: user.email,
			});
		} catch (err) {
			res.status(500).json(err);
		}
  }
  

	static async login(req, res) {
		try {
			const params = {
				email: req.body.email,
				password: req.body.password
			};

			const user = await User.findOne({
				where: {
					email: params.email,
				},
			});
      console.log(user)
			if (!user) {
				res.status(401).json({
					message: "wrong email/password",
				});
			} else if (!comparePassword(params.password, user.password)) {
				res.status(401).json({
					message: "wrong email/password",
				});
			} else {
				const access_token = signToken({
					id: user.id,
					email: user.email,
				});
				res.status(200).json(access_token);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	}
}

module.exports = UserController;
