const axios = require('axios')

class ZomatoController{
    static restaurant(req, res, next){
        axios.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${req.params.res_id}`, {
            headers: {user_key: `${process.env.ZOMATO_API_KEY}`,
            params: {res_id : req.params.res_id}
            }
        })
        .then(response => {
            // console.log(response.data, 'ini response')
            res.status(200).json({ data:response.data })
        })
        .catch(err => {
            console.log(err.response.data)
            next(err.response.data)
        })
    }
}
module.exports = ZomatoController