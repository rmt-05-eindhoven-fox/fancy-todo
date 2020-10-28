'use strict'

const axios = require('axios');

class QuotesController{
  static async getRandomQuotes(req, res, next){
    try {
      const response = await axios.get('https://programming-quotes-api.herokuapp.com/quotes/random');
      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = QuotesController