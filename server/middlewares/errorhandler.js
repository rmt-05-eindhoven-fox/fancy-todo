module.exports = (err, req, res, next) => {
  
  res.status(err.status).json({errorMessage: err.msg})
  // if(err.name === "SequelizeValidationError") {
  //   return res.status(400).json(err.errors[0])
  // }
  // res.status(500).json(error)
  // res.status(500).json(err)
  // res.status(404).json({error: err.message})
  // if(err.name === "SequelizeValidationError") {
  //   return res.status(400).json(err.errors[0])
  // }
  // if(err.name === "Error") {
  //   return res.status(404).json({error: err.message})
  // }
  // res.status(500).json(err)
  // if(err.name === "Error") {
  //   throw res.status(404).json({error: err.message})
  // }
  // res.status(500).json(err)
  // if(err.name === "SequelizeValidationError") {
  //   return res.status(400).json(err.errors[0])
  // }
  // if(err.name === "Error") {
  //   return res.status(404).json({error: err.message})
  // }
  // res.status(500).json(err)
  // if(err.message === "Minimal password length is 6") res.status(400).json(err.message)
  // res.status(400).json(err)
  // if(error.message === `Username/Password error`) {
  //   throw res.status(401).json(error.message)
  // }
  // res.status(400).json(error)
}