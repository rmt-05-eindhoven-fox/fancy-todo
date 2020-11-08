const modelUser = require('../models').User
const { comparePassword} = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const verifyTokenGoogle = require("../helpers/verifyTokenGoogle")
class ControlUser {
    static register(req, res, next) {
        modelUser.findOne({ where: { email: req.body.email } })
            .then(userEmailFound => {
                if (userEmailFound) {
                    next({ code: 400, message: "Ooops! Email is already registered!" })
                } else {
                    let { username, email, password } = req.body
                    return modelUser.create({
                        username,
                        email,
                        password
                    })
                }
            })
            .then(userRegistered => {
                res.status(201).json({ id: userRegistered.id, email: userRegistered.email, msg:'Register success!' })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        modelUser.findOne({ where: { email: req.body.email } })
            .then(userFound => {
                if (userFound) {
                    const fixPass = comparePassword(req.body.password, userFound.password)
                    if (fixPass) {
                        let token = generateToken({ id: userFound.id })
                        req.headers.token = token
                        res.status(201).json({ token })
                    } else {
                        next({ code: 400, message: "Wrong password or email" })
                    }
                } else {
                    next({ code: 400, message: "Wrong password or email" })
                }
            })
            .catch(err => {

                next(err)
            })

    }

    static getUserById(req, res, next) {
        modelUser.findOne({ where: { id: req.params.id } })
            .then(usernyaFound => {
                if (usernyaFound) {
                    res.status(200).json(usernyaFound)
                } else {
                    next({ code: 404, message: "User not found" })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static google(req, res, next) {
        let email
        let username
        const tokenGoogle = req.body.id_token
        const payload = verifyTokenGoogle(tokenGoogle)
        payload.then(data => {
            email = data.email
            username = data.name
            return modelUser.findOne({ where: { email: email } })
        })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return modelUser.create({
                        username: username,
                        email: email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(userFromGoogle => {
                const token = generateToken({ id: userFromGoogle.id })
                req.headers.token = token

                res.status(200).json({ userFromGoogle, token })
            })
    }

}

module.exports = ControlUser
