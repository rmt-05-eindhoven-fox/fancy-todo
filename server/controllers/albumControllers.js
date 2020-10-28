const axios = require('axios')

class AlbumController {
  static async findAlbum(req, res) {
    try {
      const response = await axios({
        url: 'https://api.spotify.com/v1/albums/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.TOKEN_SPOTIFY}`
        }
      })
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = AlbumController;