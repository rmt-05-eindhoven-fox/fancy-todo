const Verifier = require("email-verifier");
 
let verifier = new Verifier(process.env.EMAILVERIFKEY);

const emailVerifier = email => {
  return new Promise((resolve, reject) => {
    verifier.verify(email, (err, data) => {
      if (err) reject(err);
      else {
        // console.log(data);
        if (data.smtpCheck === 'false' || data.disposableCheck === 'true') {
          reject(new Error('Please try different email'))
        }
        else {
          resolve(data)
        }
      };
    });
  });
};

module.exports = emailVerifier;