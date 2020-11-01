const axios = require('axios')

class ControllerMovie {
  static getPopularMovie(req, res) {
    axios({
      methode: "get",
      url: "https://api.themoviedb.org/3/movie/popular",
      headers: {
        Authorization: `Bearer ${process.env.ACCESSTOKEN}`
      }

    })
      .then(response => {
        res.status(200).json(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = ControllerMovie