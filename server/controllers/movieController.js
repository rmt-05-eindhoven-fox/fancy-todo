const axios = require('axios')

class MovieController {
  static findPopularMovie(req, res, next) {
    axios({
      url: 'https://api.themoviedb.org/3/movie/popular',
      method: 'get',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_TMDB}`
      }
    })
      .then(({ data }) => {
        res.status(200).json(data.results)
      })
      .catch(error => {
        next(error)
      })
  }
}

module.exports = MovieController