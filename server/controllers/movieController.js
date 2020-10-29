const axios = require('axios')

class MovieController {
  static findPopularMovie(req, res) {
    axios({
      url: 'https://api.themoviedb.org/3/movie/popular',
      method: 'get',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_TMDB}`
      }
    })
    // .then(response => {
    //   res.status(200).json(response.data.results)
    // })
      .then(({ data }) => {
        res.status(200).json(data.results)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }
}

module.exports = MovieController