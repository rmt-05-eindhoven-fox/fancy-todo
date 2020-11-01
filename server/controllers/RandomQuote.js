const axios = require('axios');

class RandomQuote{
    static randomizeQuote(req, res, next) {

        axios({
            method: 'get',
            url: 'https://zenquotes.io/api/random'
        }) 
        .then(result => {
            console.log(result)
            const quote = result.data[0].q
            const author = result.data[0].a

            const data = {
                quote,
                author
            }
            res.status(200).json(data)
        })
        .catch(err => {
            next({msg:'Cannot Get Quote'})
        })
    }
}

module.exports = RandomQuote;