const axios = require('axios')

keepAlive = () => {
   axios({
      url: "http://murmuring-taiga-32090.herokuapp.com/ping",
      method: 'GET',
   })
   .then(res => {
      console.log({message: res.data.message});
    })
   .catch(err => {
      console.log(err);
    });
}

module.exports = {keepAlive}