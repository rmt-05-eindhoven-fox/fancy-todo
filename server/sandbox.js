const moment = require('moment')

let date = "2020-10-20"
date = Date.parse(date)
let dateNow = new Date()

console.log(date)
console.log(dateNow > date)