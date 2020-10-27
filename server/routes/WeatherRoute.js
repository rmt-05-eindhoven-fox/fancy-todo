const route = require('express').Router()
const axios = require('axios')

route.get('/',(req,res,next) => {
    let city = null;
    let weatherData = null;
    axios({
        method: 'GET',
        url: `https://ipinfo.io?token=4d473ff0435e1f`
      })
    .then(response =>{
        city = response.data.city
        
        return axios({
            method:'GET',
            url:`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5960cf1ab3f39f36ca4f61cedc8b3f16`
        })
    })
    .then(response => {
        weatherData = response.data
        res.status(200).json({weatherData})
    })
    .catch(err => next(err))
})



module.exports = route