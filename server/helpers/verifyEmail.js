const Verifier = require("email-verifier");
 
let verifier = new Verifier(process.env.EMAILVERIFKEY);

const emailVerifier = email => {
  return new Promise((resolve, reject) => {
    verifier.verify(email, (err, data) => {
      if (err) reject(err);
      else {
        // console.log(typeof data.smtpCheck, 'in verifierrrrrrrrrrrrrrrrrrrrrrr')
        if (data.smtpCheck === 'false') {
          // console.log('smtp falseeeeeeeeeeeee')
          reject(new Error('Please use different email'))
        }
        else {
          resolve(data)
        }
      };
    });
  });
};

module.exports = emailVerifier;