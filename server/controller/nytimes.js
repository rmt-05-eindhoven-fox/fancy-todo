const axios = require('axios')

class NyTimes {
    static articles(req,res,next){
        console.log( "<<< data");
        axios({
            "url": "https://api.nytimes.com/svc/topstories/v2/books.json?api-key=8vEBI3KMjYM9wQQsglPeSZWR5DqHz0fO",
            "method": "GET",
            "headers": {
              "Accept": "application/json"
            }
        })
        .then(data =>{
            res.status(200).json(data.data.results)
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

module.exports = NyTimes