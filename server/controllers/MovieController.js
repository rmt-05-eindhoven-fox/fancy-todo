const axios = require('axios')

class MovieController{
  static async getPopularTv(req, res, next){
   try {
    const movieData = await axios({
      url: 'https://api.themoviedb.org/3/tv/popular',
      method: 'get',
      headers : {
        Authorization : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzc3OGNmZDE3YTZhZDFlNDVlZTg3Mjc0YWM1YWUyZSIsInN1YiI6IjVmOTdkNDcxYWM2MTdjMDAzNmY3ZGRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oFqFjzywnMvrayapAhxi-7KA81qnI6wYuYZ-fDsRF5Y`
      }
    })

    res.status(200).json(movieData.data)
    
   } catch (error) {
      next(error)
   }
    
  }
  
  static async getTimoTweets(req,res,next){ // Testing twitter API
    try {
      const timoTweets = await axios ({
        url : `https://api.twitter.com/2/users/by?usernames=Timobros`,
        method : 'get'
      })
      console.log(timoTweets.data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MovieController