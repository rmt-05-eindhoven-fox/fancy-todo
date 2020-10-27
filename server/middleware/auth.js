const { verifyToken } = require('../helpers/token');
const { User, Todo } = require('../models');

const authentication = async (req, res, next) => {
  const accessToken = req.headers.access_token;
  const verifiedData = verifyToken(accessToken);
  try {
    if (!accessToken) {
      throw {
        name: 'AuthenticationFailed'
      };
    } else if (!verifiedData) {
      throw {
        name: 'AuthenticationFailed'
      };
    } else {
      const { id, email } = verifiedData;
      req.user = { id, email }; 
      next();
    }
  } catch (error) {
    // console.log(error, 'ini error autentikasi');
    next(error);
  }
}

const authorization = async (req, res, next) => {
  const todoId = +req.params.id;
  // console.log(req.params);
  const { id } = req.user;
  // console.log(id);
  try {
    const userTodo = await Todo.findByPk(todoId, {
      include: User
    });

    if (!userTodo) {
      throw {
        name: 'NotFound'
      }
    } else if (userTodo.User.id !== +id) {
      throw {
        name: 'NotAuthorized'
      }
    } else {
      next();
    }
    
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
  authorization
}