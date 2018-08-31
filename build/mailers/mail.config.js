var nodemailer = require('nodemailer');

const sender = {
  host: 'send.one.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noreply@youthpartyng.com',
    pass: 'noreply123'
  }
};

const smtpConfig = {
  host: 'smtp.booktu.org',
  port: 465,
  secure: true,
  auth: {
    user: 'info@booktu.org',
    pass: 'infobooktu'
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = smtpConfig;