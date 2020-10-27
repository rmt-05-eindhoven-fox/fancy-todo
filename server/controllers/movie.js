const axios = require('axios')

class MovieController {
  static findPopular(req, res) {
    axios({
      url: 'https://api.themoviedb.org/3/movie/popular',
      method: 'get',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_TMDB}`
      }
    })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = MovieController