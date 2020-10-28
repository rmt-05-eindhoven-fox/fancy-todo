const { Todo } = require("../models");

async function authorization(request, response, next) {
    try {
        const id = +request.params.id;
        const data = await Todo.findByPk(id)
        // console.log("Id Todos = ",id);
        // console.log("UserId di Todos : ",data.UserId);
        // console.log("Logged in User id : ",request.loggedInUser);
        if(!data) {
            response.status(404).json({msg: 'Todo not found'})
        } else if(data.UserId === request.loggedInUser.id) {
            next();
        } else {
            response.status(401).json({msg: 'Unauthorized'})
        }
    } catch (error) {
        console.log(Error);
        response.status(404).json({msg: 'Internal Server Error'});
    }
}

module.exports = authorization;