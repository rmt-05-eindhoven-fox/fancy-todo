const {project,project_member} = require('../models/index')
 
const response = require('../helpers/response')


function authorization(req, res, next,name=""){ 
    if(req.baseUrl === "/projects"){
        project.findByPk(req.params.id)
            .then((dataProject) => {
                if(!dataProject){
                    throw {message: "project not found"}
                } else {
                    project_member.findOne({
                        where:{
                            user_id:req.loggedInUser.id
                        }
                    })
                    .then(data=>{
                        if(data)
                            next()
                        else
                            throw {message: "not authorized"}
                    })
                    .catch(err=>{
                        next(err)
                    })
                }
        })
        .catch((err) => {
            const message = err.message || {message: "invalid requests"}
            res.status(400).json(response.onFailed(message))
        })
    }else if(req.baseUrl === '/members'){
        const authorId = req.loggedInUser.id
        const user_id = req.body.user_id || req.params.userid
        const project_id = req.body.project_id || req.params.projectid

        project_member.findOne({
            where:{
                user_id:authorId,
                project_id:project_id
            }
        })
        .then(data=>{
            if(!data)
                throw {message: "not authorized"}
            
            next()            
        })
        .catch(err=>{
            next(err)
        })
    }else{
        next()
    }
}

module.exports = authorization 