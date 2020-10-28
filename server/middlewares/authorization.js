const {
  Todo
} = require('../models/')

async function authorization(req, res, next) {
  const {
    id
  } = req.params
  try {
    const data = await Todo.findByPk(id)
    if (!data) {
      throw {
        msg: 'Todo not found',
        status: 404
      }
    } else if (data.userId === req.loggedInUser.id) {
      next()
    } else {
      throw {
        msg: 'Not authorized',
        status: 401
      }
    }
  } catch (error) {
    const status = error.status || 500
    const msg = error.msg
    res.status(status).json({
      error: msg
    })
  }
}

module.exports = authorization