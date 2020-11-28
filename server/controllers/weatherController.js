'use strict'
const axios = require('axios')
require('dotenv').config()

class Weather{
    static showWeather(req,res,next){
        axios({
            url: `http://api.openweathermap.org/data/2.5/weather?id=1642907&appid=a0f1265960cfc4b97ee8ff015355aec9`
        })
        .then(data=>{
            let result = data.data
            let lempar = {
                name: result.name.split(' ')[0n],
                temp: `${Math.round((result.main.temp-273)*10)/10} °C`,
                weather: result.weather[0].main
            }
            res.status(200).json(lempar)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Weather