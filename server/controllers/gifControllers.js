const axios = require('axios')

class GifController {
  static async getGif(req, res) {
    try {
      const response = await axios({
        url: 'api.giphy.com/v1/gifs/random',
        method: 'GET',
        params: {
          api_key: `${process.env.TOKEN_GIPHY}`,
          tag: 'burrito',
          rating: 'g',
          random_id: 'e826c9fc5c929e0d6c6d423841a282aa'
        }
      })
      console.log(response)
      res.status(200).json(response)
    } catch (error) {
      res.status(401).json(error)
    }
  }
}

module.exports = GifController;