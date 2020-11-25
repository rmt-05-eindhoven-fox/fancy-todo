const nodemailer = require('nodemailer');

function sendMail(email,subject,text){
    let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.SMTP,
    port: 465,
    secure: true, // use SSL
    auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
    }});

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMail
} 