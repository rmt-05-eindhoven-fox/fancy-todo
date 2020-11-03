const { verifyToken } = require('../helpers/token');
const { User, Todo } = require('../models');

const authentication = async (req, res, next) => {
  const accessToken = req.headers.access_token;
  const decoded = verifyToken(accessToken);
  // console.log(accessToken)
  try {
    if (!accessToken) {
      throw {
        name: 'AuthenticationFailed'
      };
    } else if (!decoded) {
      throw {
        name: 'AuthenticationFailed'
      };
    } else {
      const { id, email } = decoded;
      const user = await User.findByPk(id);
      if(user) {
        req.user = { id, email };
        next();
      } else {
        throw {
          name: 'AuthenticationFailed'
        };
      }
    }
  } catch (error) {
    next(error);
  }
}

const authorization = async (req, res, next) => {
  const todoId = +req.params.id;
  const { id } = req.user;
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