'use strict'

const axios = require('axios');

class LyricController{
  static async getQuotes(req, res){
    try {
      const res = await axios.get(`http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`);
      res.status(200).json(res.data);
    } catch (err) {
      res.status(404).json({msg: err.message});
    }
  }
}

module.exports = LyricController;