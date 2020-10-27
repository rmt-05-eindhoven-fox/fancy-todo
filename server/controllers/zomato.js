const axios = require("axios")

class ZomatoController {
	static findCuisine (req, res, next) {
		axios({
			url: 'https://developers.zomato.com/api/v2.1/cuisines?city_id=11052',
			method: 'get',
			headers: {
				'user-key': 'abb4f24a7effde6c470a26b8cedfaced'
			}
		})
		.then((result) => {
			res.status(200).json(result.data.cuisines)
		}).catch((err) => {
			next(err)
		});
	}
}

module.exports = ZomatoController