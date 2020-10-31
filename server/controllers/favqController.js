const axios = require('axios')

class FavqController {
  static async qotd(req, res, next) {
     try {
       const response = await axios.get('https://favqs.com/api/qotd');
       res.status(200).json(response.data.quote)
     } catch (error) {
       next(error);
     }
  }
}

module.exports = FavqController