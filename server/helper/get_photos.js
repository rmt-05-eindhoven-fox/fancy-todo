const {Photo} = require('../database/models')
const axios = require('axios')

getPhotos = () => {
   axios({
      url: "https://api.unsplash.com/photos/random?query=nature&orientation=landscape",
      method: 'get',
      headers: {
         "Authorization": `Client-ID ${process.env.UNSPLASH_TOKEN}`
      }
   })
   .then(res => {
      let url = res.data.urls.full
      console.log(url);

      const photo = Photo.create({
         url
      })
    })

    .catch(err => {
      console.log(err);
    });
}

module.exports = {getPhotos}