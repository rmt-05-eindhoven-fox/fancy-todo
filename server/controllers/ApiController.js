const axios = require('axios');
const baseURL = 'https://calendarific.com/api/v2';
const calendarToken = process.env.CALENDARTOKEN;

class ApiController {
  static async getHoliday(req, res, next) {
    const date = new Date();

    try {
      let holidays = await axios({
        url: baseURL + '/holidays',
        method: 'get',
        params: {
          api_key: calendarToken,
          country: 'ID',
          year: `${date.getFullYear()}`
        }
      });
      
      holidays = holidays.data.response.holidays.map(el => {
        return {
          title: el.name,
          date: el.date.iso
        }
      });
      res.status(200).json(holidays);
    } catch (err) {
      next(err);
    }
  }

}

module.exports = ApiController;