const axios = require("axios")

class QuoteController{
  static getQuote(req,res,next){
    axios.get(`https://favqs.com/api/qotd`)
    .then(data => {
      res.status(200).json(data.data.quote.body)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}

module.exports = QuoteController