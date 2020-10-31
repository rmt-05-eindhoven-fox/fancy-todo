const axios = require('axios');

class NewsController {

  static getNews(req, res, next) {
    axios({
      url: `https://newsapi.org/v2/top-headlines?country=id&category=business&apiKey=${process.env.NEWS_API_KEY}`,
      method: 'GET'
    })
    .then((result) => {
      let news = [];
      for (let i = 0; i < 5; i++) {
        news.push(result.data.articles[i]);
      }
      res.status(200).json(news);
    })
    .catch((err) => {
      next(err);
    });
  }

}

module.exports = NewsController;