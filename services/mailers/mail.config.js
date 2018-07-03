var nodemailer = require('nodemailer');

const sender =   {
        host: 'send.one.com',
        port: 465,
        secure: true,
        auth: {
          user: 'noreply@youthpartyng.com',
          pass: 'noreply123'
        }
      };

const transporter = nodemailer.createTransport(sender);

module.exports = sender;
