const axios = require('axios')

class NewsController {
  static getHeadlines(req, res, next) {
    axios.get('https://www.news.developeridn.com/')
      .then(data => {
        res.status(200).json(data.data.data)
      })
      .catch(err => {
        next(err)
      })
  }

  static detailNews(req, res, next) {
    const url = req.body.url
    axios.get(`https://www.news.developeridn.com/detail/?url=${url}`)
      .then(data => {
        res.status(200).json(data.data.data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = NewsController