const { parseISO } = require('date-fns');
const isAfter = require('date-fns/isAfter')

const checkIsAfter = (date) => {
   const result = isAfter(parseISO(date), new Date())
   
   return result
}

// console.log(checkIsAfter("2020-10-30"));
// console.log(checkIsAfter("2020-09-22"));
module.exports = {checkIsAfter}