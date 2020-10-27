const API_KEY = '2e6317059237a55b4e34ededfa82e231-9b1bf5d3-2b6a7aca';
const DOMAIN = 'sandbox72e3ef21aa3d47cfa2390d08c0912c55.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

async function sendEmail(credentials){
    await mailgun.messages().send(credentials, (error, body) => {
        console.log(body)
    }); 
}

module.exports = sendEmail;