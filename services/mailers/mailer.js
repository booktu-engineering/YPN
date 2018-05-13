var nodemailer = require('nodemailer');
var senderConfigs = require('./mail.config.js');

const transporter = nodemailer.createTransport(senderConfigs);

const Mailer = {

 dispatch:  (body) => {
   console.log(body);
  const { destination, message, subject } = body
  let mailOptions = {
     from: '"Hasstrup Ezekiel" <noreply@YPN.com>', // sender address
     to: destination, // list of receivers
     subject: subject, // Subject line
     text: message, // plain text body
     html: message // html body
   };

   transporter.sendMail(mailOptions, (error, info) => {
     if(error){
       throw error
       return false;
     }
     console.log('message sent');
     return true
   })
}
}

module.exports = Mailer;
