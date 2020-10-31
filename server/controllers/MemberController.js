const {project,project_member,user} = require("../models/index")
const response = require("../helpers/response")
const mailer = require('../helpers/mailer')

class MemberController{
    static Create(req, res, next){
        try {
            const data = req.body
            const userId = req.loggedInUser.id
            const member = {
                user_email:data.user_email || "",
                project_id:data.project_id || "",
                member_status:'user',
                createdAt: new Date(),
                updatedAt: new Date()
            }

            user.findOne({
                where:{
                    email:member.user_email
                }
            })
            .then(data=>{
                if(!data)
                    return res.status(400).json(response.onFailed("can't register a member, email does not exists"))

                member["user_id"] = data.id                
                project_member.findOne({
                    where:{
                        user_id:userId,
                        project_id:member.project_id,
                    }
                }).then(data=>{
                    
                    if(data.member_status != "author")
                        return res.status(400).json(response.onFailed("can't register a member, please contact author to add member"))

                    project_member.findOne({
                        where:{
                            user_id:member.user_id,
                            project_id:member.project_id 
                        }
                    })
                    .then(data=>{
                        if(data)
                            return res.status(409).json(response.onFailed("member already register in project"))

                        project_member.create(member)
                        .then(data=>{
                            mailer.sendMail(member.user_email,"Added member","you added to project, please check todo in project")                            
                            return res.status(201).json(response.onSuccess("success register member",data))                    
                        })
                        .catch(err=>{
                            next(err)
                        }) 
                    })
                    .catch(err=>{
                        next(err)
                    })
                })        
                .catch(err=>{
                    next(err)
                })
            })
            .catch(err=>{
                next(err)
            })
        } catch (err) {
            next(err)
        }
    }

    static Delete(req, res, next){
        try {
                let userId = req.loggedInUser.id
                project_member.findOne({
                    where:{
                        user_id:userId,
                        project_id:req.params.projectid,
                    }
                }).then(data=>{
                    if(data.member_status != "author")
                        return res.status(400).json(response.onFailed("can't delete a member, please contact author to delete member"))


                        project_member.findOne({
                            where:{
                                project_id:req.params.projectid,
                                user_id:req.params.userid,
                            }
                        })
                        .then(data=>{
                            if(!data)
                                return res.status(400).json(response.onFailed("member not found"))

                            if(data.member_status == "author")
                                return res.status(400).json(response.onFailed("can't delete the author, please delete user only"))

                            data.destroy()
                                .then(data=>{
                                    res.status(200).json(response.onSuccess("success delete member",data))  
                                })
                                .catch(err=>{
                                    next(err)
                                })
                        })

                            })        
                .catch(err=>{
                    next(err)
                })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = MemberController