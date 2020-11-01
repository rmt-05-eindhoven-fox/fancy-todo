const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {OAuth2Client} = require('google-auth-library');

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
				password: req.body.password,
			};

			const user = await User.findOne({
				where: {
					email: params.email,
				},
			});
			console.log(user);
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

	static googleLogin(req,res,next){
		//verviy token
		let {google_access_token} = req.body
		const client = new OAuth2Client(process.env.CLIENT_ID);
		let email = ''
		//vverivy google token berdasarkan client id
	client.verifyIdToken({
       idToken: google_access_token,
       audience: process.env.CLIENT_ID
    })
    .then(ticket =>{
	   let payload = ticket.getPayload()
	   email = payload.email
	   return User.findOne({ 
		   where: 
		{email: payload.email }
		})
	 })
	 .then(user => {
		 if (user) {
			//generate token
			 return user
		 }else{
			 var userObj = {
				 email:email,
				 password: 'randomaja'
			 }
			 return User.create( userObj ) 
		 }
	 })
	 .then(dataUser => {
		 console.log(dataUser, "di line 89 nih ")
		 let access_token = signToken({id: dataUser.id, email: dataUser.email})
		 return res.status(200).json({access_token})
	 })
 	 .catch(err => {
	  console.log(err)
  })
}

 
}

module.exports = UserController
