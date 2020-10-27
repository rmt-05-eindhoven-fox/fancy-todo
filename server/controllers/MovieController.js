const axios = require('axios')

class MovieController{
  static async getPopularTv(req, res, next) {
   try {
    const movieData = await axios({
      url: 'https://api.themoviedb.org/3/tv/popular',
      method: 'get',
      headers : {
        Authorization : `Bearer ${process.env.TMDB_API}`
      }
    })

    res.status(200).json(movieData.data)
    
   } catch (error) {
      next(error)
   }
    
  }
  
  // static async getTimoTweets(req,res,next) { // Testing twitter API
  //   try {
  //     console.log(process.env.TWITTER_BEARER)
  //     const timoTweets = await axios ({
  //       url : `https://api.twitter.com/1.1/statuses/user_timeline.json`,
  //       method : 'get',
  //       headers : {
  //         'Authorization' : `Bearer ${process.env.TWITTER_BEARER}`
  //       },
  //       data : {
  //         screen_name: 'Timobros',
  //         include_rts : false,
  //         count : 5
  //       }
  //     })

  //     console.log(timoTweets.data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}

module.exports = MovieController