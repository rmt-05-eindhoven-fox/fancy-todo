const baseURL = 'https://www.metaweather.com'
const axios = require('axios')

class WeatherController{
  static async getWeather(req, res, next){
    try {
      let location = req.params.location
      location = location.toLowerCase()

      const cityData = await axios({
        baseURL,
        method : 'GET',
        url : `/api/location/search/`,
        params : {
          query : location
        }
      })
      
      if(cityData.data.length === 0){

        next({
          status : 404,
          message : 'City not found'
        })

      } else {

        const cityId = cityData.data[0].woeid
        const weatherReport = await axios({
          baseURL,
          method : 'GET',
          url : `/api/location/${cityId}/`,
        })
        
        res.status(200).json(weatherReport.data.consolidated_weather[0])
      }


    } catch (error) {
      next(error)
    }
  }
}

module.exports = WeatherController