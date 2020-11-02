const axios = require('axios')

keepAlive = () => {
   axios({
      url: "http://localhost:3000/ping",
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