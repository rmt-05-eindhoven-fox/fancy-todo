const routes = require("express").Router()
const controlProject = require("../controllers/projectController")
const authentication = require("../middlewares/authenticate")
const { forProject } = require("../middlewares/authorization")


routes.post("/", authentication, controlProject.createProject)
routes.get("/api/name/:id", controlProject.getProjectName)
routes.post("/addMember/:idProject", authentication, forProject, controlProject.addMember)

routes.get("/myProjects", authentication, controlProject.getMyProjects)

routes.get("/", controlProject.allProject)
routes.post("/todo/:idProject", authentication, forProject, controlProject.addTodoProject)
routes.put("/todo/:idTodo", authentication, forProject, controlProject.editTodoProject)


routes.delete("/todo/:idTodo", authentication, forProject, controlProject.deleteTodoProject)
routes.get("/all/todo/:idProject", controlProject.allTodoInProject)
routes.get("/all/members/:idProject", controlProject.getAllMemberinProject)
routes.delete("/:idProject", authentication, forProject, controlProject.deleteProject)
routes.get("/:idProject", controlProject.getProjectById)

module.exports = routes
