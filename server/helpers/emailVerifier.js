const Verifier = require('email-verifier')

let verifier = new Verifier("at_P3fczF7jlGX0dDgbcDSB5SEBKe3jh");

const verifyEmail = email => {
  return new Promise((resolve, reject) => {
    verifier.verify(email, (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

// verifier.verify("r@rdegges.com", (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });
// console.log(verifier)

module.exports = verifyEmail
