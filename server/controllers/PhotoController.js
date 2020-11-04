const cron = require('node-cron');
const {Photo} = require('../database/models')
const faker = require('faker')

class PhotoController {
   static async getBackgroundImage(req, res, next) {
      try {
         const photos = await Photo.findAll()
         
         let photoCount = photos.length
         let randomPhotos = faker.random.number({
            'min': 1,
            'max': photoCount
         });

         res.status(200).json({
            url: photos[randomPhotos].url
         })
      } catch (err) {
         next(err)
      }
   }
}

module.exports = PhotoController