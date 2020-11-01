const moment = require('moment')

function convertFromDate(date){
  return moment(date).format('YYYY-MM-DD')
}

function convertToWords(date){
  const currentDate = new Date()

  const diffTime = Math.abs(date - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  if(diffDays > 10){
    return moment(date).format("MMM Do YY")

  } else {
    return moment(date).startOf('day').fromNow(); 
  }
}


function convertToDate(inputDate){
  return moment(inputDate).toDate()
}


module.exports = { convertFromDate, convertToDate, convertToWords }