const generator = require('generate-password')

generatePassword = () => {
   return password = generator.generate({
      length: 13,
      numbers: true,
      symbols: true,
      strict: true
   })
}

module.exports = {generatePassword}