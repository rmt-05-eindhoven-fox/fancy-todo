const axios = require('axios')

class FavRoute {
  static show(req, res, next) {
    axios({
      method: 'GET',
      url: `https://favqs.com/api/qotd`
    })
      .then((data) => {
        res.status(200).json(data.data.quote.body)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = FavRoute