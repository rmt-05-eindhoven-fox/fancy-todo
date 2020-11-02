const axios = require('axios');

class CookController {
  static findCook(req, res) {
    axios({
      url: "https://masak-apa.tomorisakura.vercel.app/api/recipes",
      method: "get"
    })
      .then(response => {
        const dataCook = response.data.results;
        const random = Math.floor(Math.random() * dataCook.length);
        res.status(200).json(dataCook[random]);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }
}

module.exports = CookController