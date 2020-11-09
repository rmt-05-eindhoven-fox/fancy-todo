const modelTodo = require("../models").Todo
const modelProjectUser = require("../models").ProjectUser
const modelUser = require("../models").User
function forIndividualTodo(req, res, next) {
    modelTodo.findOne({ where: { id: req.params.id, UserId: req.payload.id } })
        .then(todoFound => {
            if (todoFound) {
                next()
            } else {
                next({ code: 401, message: "Unauthorized" })
            }
        })
        .catch(err => {
            next(err)
        })
}

function forProject(req, res, next) {
    if (req.params.idProject) {

        modelProjectUser.findAll({ where: { UserId: req.payload.id }, include: modelUser })
            .then(found => {
                if (found.length > 0) {

                    for (let i of found) {
                        if (i.ProjectId == req.params.idProject && i.User.id == req.payload.id) {
                            req.ProjectId = i.ProjectId
                        }
                    }
                    if (!req.ProjectId) {
                        next({ code: 401, message: "Yikes! No access allowed!" })
                    } else {
                        next()
                    }

                } else {
                    next({ code: 400, message: "Oops! ID is not found" })
                }
            })
            .catch(err => {
                next(err)
            })
    } else if (req.params.idTodo) {
        modelTodo.findOne({ where: { id: req.params.idTodo } })
            .then(foundTodos => {
                let projectIni = foundTodos.dataValues.ProjectId
                return modelProjectUser.findAll({ where: { ProjectId: projectIni } })
            })
            .then(allProjects => {
                for (let i of allProjects) {
                    if (i.dataValues.UserId == req.payload.id) {
                        req.ProjectId = i.dataValues.ProjectId
                    }
                }
                if (!req.ProjectId) {
                    next({ code: 401, message: "Yikes! No access allowed!" })
                } else {
                    next()
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = { forIndividualTodo, forProject }