const moment = require('moment')

dateFormat = (date) => {
   date = date.toISOString()
   newDate = moment(date).format('YYYY-MM-DD')
   return newDate
}

module.exports = {dateFormat}
// console.log(dateFormat("2020-11-15T00:00:00.000Z"));