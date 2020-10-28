const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { loginToken } = require("../helpers/jwt");

class userController{
    static async register(request, response){
        try{
            const payload = {
                email: request.body.email,
                password: request.body.password
            }
            const user = await User.create(payload);
            console.log("user bisa create");
            response.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch(error) {
            console.log(error);
            response.status(500).json(error);
        }
    }

    static async login(request, response){
        try{
            const payload = {
                email: request.body.email,
                password: request.body.password
            }

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            });

            if (!user) {
                response.status(401).json({
                    message: 'Wrong email/password!'
                });
            } else if (!comparePassword(payload.password, user.password)) {
                response.status(401).json({
                    message: 'Wrong email/password!'
                })
            } else {
                const access_token = loginToken({
                    id: user.id,
                    email: user.email
                });

                response.status(200).json({
                    access_token
                })
            }

        } catch(error) {
            response.status(500).json(error);
        }
    }
}

module.exports = userController;