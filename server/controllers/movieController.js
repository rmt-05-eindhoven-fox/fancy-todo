const axios = require('axios')

class MovieController {
static findTrendingMovies(req,res){
    axios({
  method: 'get',
  url: 'https://api.themoviedb.org/3/trending/all/week',
  headers:{
      Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzZlYjRhYTFjZmNlZGQzMTU0NDA5ZTFjMjc4N2Q3OSIsInN1YiI6IjVmOWRhYzU3MTk2NzU3MDAzNjlmNjIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ib-wB06eYzZVbg9Wh5kvPszAqsFpeTpyFg8nZ6iGR0Q`
        } 
    })
    .then(response => {
        res.status(200).json(response.data.results)
    // console.log(response.data.results)
    })
    .catch(error => {
    console.log(error)
    })
  } 
}

module.exports = MovieController