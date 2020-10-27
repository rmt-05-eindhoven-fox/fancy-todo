const axios = require('axios');

class MovieController {
  static findPopularMovie (req, res) {
    axios({
      url: 'https://api.themoviedb.org/3/movie/popular',
      method: 'get',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_TMDB}`
      }
    })
    .then((reponse) => {
      res.status(200).json(reponse.data.results);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
  }
}

module.exports = MovieController